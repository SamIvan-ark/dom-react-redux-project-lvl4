import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import store from './slices';
import i18nextInstance from './utils/i18next';
import { providers } from './providers';

const { AuthProvider, ApiProvider, ConditionalRollbarProvider } = providers;

const init = async () => (
  <ConditionalRollbarProvider>
    <I18nextProvider i18n={i18nextInstance}>
      <ApiProvider>
        <AuthProvider>
          <StoreProvider store={store}>
            <App />
          </StoreProvider>
        </AuthProvider>
      </ApiProvider>
    </I18nextProvider>
  </ConditionalRollbarProvider>
);

export default init;
