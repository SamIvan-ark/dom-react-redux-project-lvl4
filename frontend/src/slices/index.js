import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import modalsSlice from './modalsSlice';

export default configureStore({
  reducer: {
    channels: channelsSlice,
    modals: modalsSlice,
  },
});
