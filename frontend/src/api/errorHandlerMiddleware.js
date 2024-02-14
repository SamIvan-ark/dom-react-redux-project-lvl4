import { isRejectedWithValue } from '@reduxjs/toolkit';

import i18next from '../utils/i18next';
import toasts from '../utils/toasts';

const errorHandlerMiddleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 'FETCH_ERROR') {
      toasts.error(i18next.t('errors.networkError'));
    }
  }

  return next(action);
};

export default errorHandlerMiddleware;
