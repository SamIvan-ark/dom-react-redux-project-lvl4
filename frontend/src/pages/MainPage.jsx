import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import getAuthHeader from '../utils/getAuthHeader';
import CenteredSpinner from '../components/CenteredSpinner';
import { Chat, Navbar } from '../components';
import { fetchChatData } from '../api/serverApi';
import { hooks } from '../providers';
import { serverRoutes } from '../utils/routes';
import { addChannels, setDefaultChannel, setActive } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import toasts from '../utils/toasts';

const MainPage = () => {
  const [fetchStatus, setFetchStatus] = useState(null);
  const { useAuth, useApi } = hooks;
  const navigate = useNavigate();
  const auth = useAuth();
  const { socket } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const connectToChat = async () => {
      try {
        setFetchStatus('fetching');
        const { data } = await fetchChatData(serverRoutes.dataPath(), { headers: getAuthHeader() });
        const { channels, currentChannelId, messages } = data;
        dispatch(setDefaultChannel(currentChannelId));
        dispatch(setActive(currentChannelId));
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        setFetchStatus('idle');
        socket.connect();
      } catch (err) {
        setFetchStatus('failed');
        if (err.isAxiosError && err.code === 'ERR_NETWORK') {
          toasts.error(t('errors.networkError'));
        }
        if (err.isAxiosError && err.response.status === 401) {
          toasts.info(t('errors.invalidToken'));
          auth.logOut();
          navigate('/login');
        }
        setFetchStatus('idle');
      }
    };

    connectToChat();
  }, [auth, dispatch, navigate, socket, t]);
  return (fetchStatus !== 'idle') ? (
    <CenteredSpinner />
  ) : (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default MainPage;
