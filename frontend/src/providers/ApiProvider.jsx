import { createContext, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';

const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const socket = io({
    autoConnect: false,
  });
  const { t } = useTranslation();
  const value = useMemo(() => ({
    socket,
  }), [socket, t]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};
