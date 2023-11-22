import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';

const MainPage = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <Chat />
  </div>
);

export default MainPage;
