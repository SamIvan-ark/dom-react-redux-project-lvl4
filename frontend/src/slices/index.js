import { configureStore } from '@reduxjs/toolkit';

import channelsApi from '../api/channelsApi';
import messagesApi from '../api/messagesApi';
import userApi from '../api/userApi';
import uiSlice from './uiSlice';

export default configureStore({
  reducer: {
    ui: uiSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([userApi.middleware, channelsApi.middleware, messagesApi.middleware]),
});
