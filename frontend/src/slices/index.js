import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import modalsSlice from './modalsSlice';
import messagesSlice from './messagesSlice';
import userSlice from './userSliсe';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    modals: modalsSlice,
    messages: messagesSlice,
    user: userSlice,
  },
});
