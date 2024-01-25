import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CenteredSpinner from '../components/CenteredSpinner';
import { Chat, Navbar } from '../components';
import { hooks } from '../providers';
import { addChannels, setDefaultChannel, setActive } from '../slices/channelsSlice';
// import { addMessages } from '../slices/messagesSlice';
import toasts from '../utils/toasts';
import { useGetChannelsQuery } from '../api/channelsApi';

const MainPage = () => {
  const {
    data: channels,
    isLoading: isChannelsLoading,
    isSuccess: isChannelsLoadingSuccess,
    isError: isChannelsLoadingError,
    error: channelsLoadingError,
  } = useGetChannelsQuery();
  const { useApi, useAuth } = hooks;
  const navigate = useNavigate();
  const auth = useAuth();
  const { socket } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isChannelsLoadingSuccess) {
      const currentChannelId = channels[0].id;
      dispatch(setDefaultChannel(currentChannelId));
      dispatch(setActive(currentChannelId));
      dispatch(addChannels(channels));
      // dispatch(addMessages(messages));
      socket.connect();
    }
  }, [
    isChannelsLoading,
    channels,
    dispatch,
    isChannelsLoadingSuccess,
    socket,
  ]);

  if (isChannelsLoadingError) {
    if (channelsLoadingError.status === 401) {
      toasts.info(t('errors.invalidToken'));
      auth.logOut();
      navigate('/login');
    } else if (channelsLoadingError.status === 'FETCH_ERROR') {
      toasts.error(t('errors.networkError'));
    }
  }

  return (isChannelsLoading || !isChannelsLoadingSuccess) ? (
    <CenteredSpinner />
  ) : (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default MainPage;
