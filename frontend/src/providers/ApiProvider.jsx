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

const WAITING_FOR_ACKNOWLEDGE_MS = 5000;

const handleEmittingResults = (cb) => (err, responce) => {
  if (err) {
    if (err.message === 'operation has timed out') {
      cb(err);
      return;
    }
    // throw err; Линтер выдает ошибку, мол нельзя выбрасывать исключения
  }
  if (responce.status === 'ok') {
    cb();
  }
};

export const ApiProvider = ({ children }) => {
  const socket = io();
  const value = useMemo(() => {
    const newMessage = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.NEW_MESSAGE, data, handleEmittingResults(cb));
    };

    const newChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.NEW_CHANNEL, data, handleEmittingResults(cb));
    };

    const removeChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.REMOVE_CHANNEL, data, handleEmittingResults(cb));
    };

    const renameChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.RENAME_CHANNEL, data, handleEmittingResults(cb));
    };

    return {
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
      socket,
    };
  }, [socket]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};
