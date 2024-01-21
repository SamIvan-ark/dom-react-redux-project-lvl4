import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import modalsSlice from './modalsSlice';
import messagesSlice from './messagesSlice';
import { chatApi } from '../services/apiSlice';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    modals: modalsSlice,
    messages: messagesSlice,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});
