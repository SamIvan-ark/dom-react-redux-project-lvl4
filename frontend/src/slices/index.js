import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import modalsSlice from './modalsSlice';
import messagesSlice from './messagesSlice';
import channelsApi from '../api/channelsApi';
import userApi from '../api/userApi';
// import * as messages from '../api/messagesApi';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    modals: modalsSlice,
    messages: messagesSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [messages.reducerPath]: messages.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([userApi.middleware, channelsApi.middleware]),
});
