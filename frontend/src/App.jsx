import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import useAuth from './hooks/useAuth';
import AuthContext from './contexts/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';

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

const ConditionalRoute = ({ children, redirectWhenAuthIsExist, redirectTo }) => {
  const auth = useAuth();

  return redirectWhenAuthIsExist === auth.loggedIn ? <Navigate to={redirectTo} /> : children;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={(
            <ConditionalRoute redirectWhenAuthIsExist={false} redirectTo="/login">
              <MainPage />
            </ConditionalRoute>
          )}
        />
        <Route
          path="/login"
          element={(
            <ConditionalRoute redirectWhenAuthIsExist redirectTo="/">
              <LoginPage />
            </ConditionalRoute>
          )}
        />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
