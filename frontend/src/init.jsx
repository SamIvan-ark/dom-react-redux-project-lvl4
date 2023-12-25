import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import AuthContext from './contexts/AuthContext';
import ApiContext from './contexts/ApiContext';
import App from './App';
import store from './slices/index';

const ApiContextProvider = ({ children }) => {
  const eventNames = {
    NEW_MESSAGE: 'newMessage',
    NEW_CHANNEL: 'newChannel',
    REMOVE_CHANNEL: 'removeChannel',
    RENAME_CHANNEL: 'renameChannel',
  };

  const socket = io();
  const value = useMemo(() => {
    const newMessage = (data, cb) => {
      socket.emit(eventNames.NEW_MESSAGE, data, cb);
    };

    const newChannel = (data, cb) => {
      socket.emit(eventNames.NEW_CHANNEL, data, cb);
    };

    const removeChannel = (data, cb) => {
      socket.emit(eventNames.REMOVE_CHANNEL, data, cb);
    };

    const renameChannel = (data, cb) => {
      socket.emit(eventNames.RENAME_CHANNEL, data, cb);
    };

    return {
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
      socket,
    };
  });

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('userId'));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const init = async () => (
  <ApiContextProvider>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </ApiContextProvider>

);

export default init;
