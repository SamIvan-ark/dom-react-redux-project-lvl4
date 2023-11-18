import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import useAuth from './hooks/index';
import AuthContext from './contexts/index';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

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

const MainRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const LoginRoute = ({ children }) => {
  const auth = useAuth();
  return (
    !auth.loggedIn ? children : <Navigate to="/" />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={(
            <MainRoute>
              <MainPage />
            </MainRoute>
          )}
        />
        <Route
          path="/login"
          element={(
            <LoginRoute>
              <LoginPage />
            </LoginRoute>
          )}
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
