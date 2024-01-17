import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import toasts from '../utils/toasts';

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

const EVENT_NAMES = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
  RENAME_CHANNEL: 'renameChannel',
};

const WAITING_FOR_ACKNOWLEDGE_MS = 5000;

const handleEmittingResults = (cb, t) => (err, response) => {
  if (err) {
    if (err.message === 'operation has timed out') {
      toasts.error(t('errors.networkError'));
    }
  }
  cb(err, response);
};

export const ApiProvider = ({ children }) => {
  const socket = io();
  const { t } = useTranslation();
  const value = useMemo(() => {
    const newMessage = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.NEW_MESSAGE, data, handleEmittingResults(cb, t));
    };

    const newChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.NEW_CHANNEL, data, handleEmittingResults(cb, t));
    };

    const removeChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.REMOVE_CHANNEL, data, handleEmittingResults(cb, t));
    };

    const renameChannel = (data, cb) => {
      socket
        .timeout(WAITING_FOR_ACKNOWLEDGE_MS)
        .emit(EVENT_NAMES.RENAME_CHANNEL, data, handleEmittingResults(cb, t));
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
