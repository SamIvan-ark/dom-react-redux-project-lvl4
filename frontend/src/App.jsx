import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { hooks } from './providers';
import {
  MainPage,
  LoginPage,
  NotFoundPage,
  SignupPage,
} from './pages';

const ConditionalRoute = ({ children, redirectWhenAuthIsExist, redirectTo }) => {
  const auth = hooks.useAuth();

  return redirectWhenAuthIsExist === auth.loggedIn ? <Navigate to={redirectTo} /> : children;
};

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
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
      <ToastContainer />
    </div>
  </div>
);

export default App;
