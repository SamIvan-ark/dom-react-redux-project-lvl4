import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import modalsSlice from './modalsSlice';
import messagesSlice from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    modals: modalsSlice,
    messages: messagesSlice,
  },
});
