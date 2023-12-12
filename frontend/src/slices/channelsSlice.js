/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import getRoute from '../routes';
import getAuthHeader from '../utils/getAuthHeader';

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannelsStatus',
  async () => {
    const { data } = await axios.get(getRoute('data'), { headers: getAuthHeader() });
    return data;
  },
);

const initialState = channelsAdapter.getInitialState({});

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
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setMany(state, channels);
        state.active = currentChannelId;
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
