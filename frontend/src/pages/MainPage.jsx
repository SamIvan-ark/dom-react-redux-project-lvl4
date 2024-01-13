import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import Chat from '../components/chat/Chat';
import { hooks } from '../providers';
import { fetchChatData } from '../api/serverApi';
import { serverRoutes } from '../utils/routes';
import getAuthHeader from '../utils/getAuthHeader';
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
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">{t('processes.loading')}</span>
      </Spinner>
    </div>
  ) : (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default MainPage;
