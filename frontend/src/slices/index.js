import { configureStore } from '@reduxjs/toolkit';
import channelsApi from '../api/channelsApi';
import userApi from '../api/userApi';
import uiSlice from './uiSlice';
import messagesApi from '../api/messagesApi';

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
