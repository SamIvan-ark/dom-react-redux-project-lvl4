import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/chat/Chat';
import socket from '../socket';

const MainPage = () => {
  socket.connect();
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Chat />
    </div>
  );
};

export default MainPage;
