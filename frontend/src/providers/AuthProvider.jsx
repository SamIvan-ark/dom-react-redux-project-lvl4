/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const logIn = (authData) => {
    localStorage.setItem('user', JSON.stringify(authData));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const getUsername = () => JSON.parse(localStorage.getItem('user')).username;
  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      getUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
