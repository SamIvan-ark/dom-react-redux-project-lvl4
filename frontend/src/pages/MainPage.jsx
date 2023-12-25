import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import { fetchChannels } from '../slices/channelsSlice';
import Chat from '../components/chat/Chat';
import useApi from '../hooks/useApi';

const MainPage = () => {
  const { socket } = useApi();
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
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Chat />
    </div>
  );
};

export default MainPage;
