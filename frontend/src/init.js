import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './slices/index';

const init = async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
