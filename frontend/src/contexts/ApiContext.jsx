import { createContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const ApiContext = createContext({});
const eventNames = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
  RENAME_CHANNEL: 'renameChannel',
};

const ApiContextProvider = ({ children }) => {
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

export default ApiContextProvider;
