import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';

import App from './App';
import { providers } from './providers';
import store from './slices';
import i18nextInstance from './utils/i18next';

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
