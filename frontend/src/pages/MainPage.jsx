import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import getAuthHeader from '../utils/getAuthHeader';
import CenteredSpinner from '../components/CenteredSpinner';
import { Chat, Navbar } from '../components';
import { hooks } from '../providers';
import { addChannels, setDefaultChannel, setActive } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';
import toasts from '../utils/toasts';
import { useGetDataQuery } from '../services/apiSlice';

const MainPage = () => {
  const headers = getAuthHeader();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDataQuery(headers);
  const { useAuth, useApi } = hooks;
  const navigate = useNavigate();
  const auth = useAuth();
  const { socket } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  /* TODO: это место дает ошибки
Если вынуть из useEffect, происходит двойной диспатч и
ошибка в консоли, что не возможно обновить компонент во время его рендеринга.
Если завернуть все в useEffect, дети получают undefined в сторе, потому что
начинают рендериться до всех диспатчей
Сейчас закостылен в компоненте MainArea.jsx, строки 47-54, но хотя бы работает без ошибок  */
  useEffect(() => {
    if (isSuccess) {
      const { channels, currentChannelId, messages } = data;
      dispatch(setDefaultChannel(currentChannelId));
      dispatch(setActive(currentChannelId));
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      socket.connect();
    }
  }, [isLoading]);

  if (isError) {
    if (error.status === 401) {
      toasts.info(t('errors.invalidToken'));
      auth.logOut();
      navigate('/login');
    } else if (error.status === 'FETCH_ERROR') {
      toasts.error(t('errors.networkError'));
    } else {
      throw error;
    }
  }
  return (isLoading || !isSuccess) ? (
    <CenteredSpinner />
  ) : (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default MainPage;
