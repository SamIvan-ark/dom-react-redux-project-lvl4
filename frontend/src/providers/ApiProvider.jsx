import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

const EVENT_NAMES = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
  RENAME_CHANNEL: 'renameChannel',
};

export const ApiProvider = ({ children }) => {
  const socket = io();
  const value = useMemo(() => {
    const newMessage = (data, cb) => {
      socket.emit(EVENT_NAMES.NEW_MESSAGE, data, cb);
    };

    const newChannel = (data, cb) => {
      socket.emit(EVENT_NAMES.NEW_CHANNEL, data, cb);
    };

    const removeChannel = (data, cb) => {
      socket.emit(EVENT_NAMES.REMOVE_CHANNEL, data, cb);
    };

    const renameChannel = (data, cb) => {
      socket.emit(EVENT_NAMES.RENAME_CHANNEL, data, cb);
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
