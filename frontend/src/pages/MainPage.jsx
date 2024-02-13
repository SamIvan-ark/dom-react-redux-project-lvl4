import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useGetChannelsQuery } from '../api/channelsApi';
import { Chat } from '../components';
import CenteredSpinner from '../components/CenteredSpinner';
import { hooks } from '../providers';
import { setActive, setDefaultChannel } from '../slices/uiSlice';
import toasts from '../utils/toasts';

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
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isStoreFullfilled = useSelector(
    (state) => state.ui.channels.activeChannel && state.ui.channels.defaultChannel,
    shallowEqual,
  );
  useEffect(() => {
    if (isChannelsLoadingSuccess) {
      const currentChannel = channels[0];
      dispatch(setDefaultChannel(currentChannel));
      dispatch(setActive(currentChannel));
      socket.connect();
    }
    if (isChannelsLoadingError) {
      if (channelsLoadingError.status === 401) {
        auth.logOut();
        document.location = '/login';
      } else if (channelsLoadingError.status === 'FETCH_ERROR') {
        toasts.error(t('errors.networkError'));
      }
    }
  }, [isChannelsLoadingSuccess, isChannelsLoadingError]);

  return (!isStoreFullfilled || isChannelsLoading || !isChannelsLoadingSuccess) ? (
    <CenteredSpinner />
  ) : (
    <Chat />
  );
};

export default MainPage;
