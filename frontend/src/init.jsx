import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App';
import store from './slices/index';
import i18nextInstance from './utils/i18next';
import { providers } from './providers/index';

const { AuthProvider, ApiProvider } = providers;

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_POST_CLIENT_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18nextInstance}>
        <ApiProvider>
          <AuthProvider>
            <StoreProvider store={store}>
              <App />
            </StoreProvider>
          </AuthProvider>
        </ApiProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default init;
