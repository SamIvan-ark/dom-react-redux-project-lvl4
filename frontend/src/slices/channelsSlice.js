/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import getRoute from '../routes';
import getAuthHeader from '../utils/getAuthHeader';

const ID_OF_DEFAULT_CHANNEL = 1;

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannelsStatus',
  async () => {
    const { data } = await axios.get(getRoute('data'), { headers: getAuthHeader() });
    return data;
  },
);

const initialState = channelsAdapter.getInitialState({ active: ID_OF_DEFAULT_CHANNEL });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels } = action.payload; // еще там messages и currentChannelId
        channelsAdapter.setMany(state, channels);
        state.loadingStatus = 'idle';
        state.error = null;
      });
  },
});

export const {
  addChannel,
  removeChannel,
  renameChannel,
  setActive,
} = channelsSlice.actions;

export default channelsSlice.reducer;
