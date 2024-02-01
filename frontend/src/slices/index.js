import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import channelsApi from '../api/channelsApi';
import userApi from '../api/userApi';
import uiSlice from './uiSlice';
// import * as messages from '../api/messagesApi';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    ui: uiSlice,
    messages: messagesSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [messages.reducerPath]: messages.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([userApi.middleware, channelsApi.middleware]),
});
