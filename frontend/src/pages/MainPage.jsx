import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CenteredSpinner from '../components/CenteredSpinner';
import { Chat, Navbar } from '../components';
import { hooks } from '../providers';
import { setDefaultChannel, setActive } from '../slices/uiSlice';
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
  const { useAuth, useApi } = hooks;
  const { socket } = useApi();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isStoreFullfilled = useSelector(
    (state) => state.ui.channels.activeChannel && state.ui.channels.defaultChannel,
  ); // сомнительно

  useEffect(() => {
    if (isChannelsLoadingSuccess) {
      const currentChannel = channels[0];
      dispatch(setDefaultChannel(currentChannel));
      dispatch(setActive(currentChannel));
      socket.connect();
    }
  }, [
    dispatch,
    isChannelsLoadingSuccess,
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

  return (!isStoreFullfilled || isChannelsLoading || !isChannelsLoadingSuccess) ? (
    <CenteredSpinner />
  ) : (
    <>
      <Navbar />
      <Chat />
    </>
  );
};

export default MainPage;
