import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import { fetchChannels } from '../slices/channelsSlice';
import Chat from '../components/chat/Chat';
import socket from '../socket';

const MainPage = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((state) => state.channels.loadingStatus);
  const isntFetched = fetchStatus === 'loading' || fetchStatus === undefined;

  useEffect(() => {
    socket.connect();
    dispatch(fetchChannels());
  }, []);

  if (isntFetched) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Chat />
    </div>
  );
};

export default MainPage;
