/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getRoute from '../routes';
import getAuthHeader from '../utils/getAuthHeader';

const initialState = {
  entities: {},
  ids: [],
};

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannelsStatus',
  async () => {
    const { data } = await axios.get(getRoute('data'), { headers: getAuthHeader() });
    return data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { id, name } = action.payload;
      state.entities[id] = { id, name, removable: true };
      state.ids.push(id);
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((i) => i !== id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.entities[id].name = name;
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
        channels.map((channel) => {
          state.entities[channel.id] = channel;
          state.ids.push(channel.id);
          return null;
        });
        state.loadingStatus = 'idle';
        state.error = null;
      });
  },
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
