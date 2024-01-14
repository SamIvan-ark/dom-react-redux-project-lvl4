import React from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { hooks } from './providers';
import config from './app-config';
import pages from './pages';

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = hooks.useAuth();

  return auth.loggedIn ? children : <Navigate to={redirectTo} />;
};

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <Router>
        <Routes>
          {Object
            .values(config.pages)
            .map(({
              id,
              route,
              isPrivate,
              component,
            }) => {
              const Component = pages[component]();
              return (
                <Route
                  key={id}
                  path={route}
                  element={isPrivate ? (
                    <PrivateRoute redirectTo="/login">
                      <Component />
                    </PrivateRoute>
                  ) : <Component />}
                />
              );
            })}
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  </div>
);

export default App;
