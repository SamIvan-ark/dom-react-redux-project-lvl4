/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  ui: {
    active: null,
    defaultChannel: null,
  },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setActive: (state, action) => {
      state.ui.active = action.payload;
    },
    setDefaultChannel: (state, action) => {
      state.ui.defaultChannel = action.payload;
    },
  },
});

export const {
  addChannel,
  addChannels,
  removeChannel,
  renameChannel,
  setActive,
  setDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
