import React, { Suspense } from 'react';
import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from './app.config';
import CenteredSpinner from './components/CenteredSpinner';
import { hooks } from './providers';

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = hooks.useAuth();

  return auth.loggedIn ? children : <Navigate to={redirectTo} />;
};
const WrappedRouteComponent = ({ children, isPrivate, redirectTo }) => (
  <Suspense fallback={<CenteredSpinner />}>
    {isPrivate ? (
      <PrivateRoute redirectTo={redirectTo}>
        {children}
      </PrivateRoute>
    ) : children}
  </Suspense>
);

const { pages } = config;

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <Router>
        <Routes>
          {Object
            .values(pages)
            .map(({
              id,
              route,
              isPrivate,
              Component,
              redirectTo,
            }) => (
              <Route
                element={(
                  <WrappedRouteComponent isPrivate={isPrivate} redirectTo={redirectTo}>
                    <Component />
                  </WrappedRouteComponent>
                )}
                key={id}
                path={route}
              />
            ))}
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  </div>
);

export default App;
