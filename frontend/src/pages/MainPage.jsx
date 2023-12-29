import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import { fetchChannels } from '../slices/channelsSlice';
import Chat from '../components/chat/Chat';
import useApi from '../hooks/useApi';

const MainPage = () => {
  const { socket } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.channels.loadingStatus);
  const isLoadingInProgress = fetchStatus === 'loading' || fetchStatus === undefined;

  useEffect(() => {
    dispatch(fetchChannels());
    socket.connect();
  }, []);

  return (isLoadingInProgress) ? (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">{t('chat.loading')}</span>
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
