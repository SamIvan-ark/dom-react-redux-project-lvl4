import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import useAuth from './hooks/useAuth';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';

const ConditionalRoute = ({ children, redirectWhenAuthIsExist, redirectTo }) => {
  const auth = useAuth();

  return redirectWhenAuthIsExist === auth.loggedIn ? <Navigate to={redirectTo} /> : children;
};

const App = () => (
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
);

export default App;
