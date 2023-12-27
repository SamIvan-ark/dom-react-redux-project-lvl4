/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import { serverRoutes } from '../utils/routes';
import { fetchData } from '../api/serverApi';
import getAuthHeader from '../utils/getAuthHeader';

const channelsAdapter = createEntityAdapter();

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannelsStatus',
  async () => {
    const data = await fetchData(serverRoutes.dataPath(), { headers: getAuthHeader() });
    return data;
  },
);

const initialState = channelsAdapter.getInitialState({
  ui: {
    active: null,
    needToMove: false,
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
    setNeedToMove: (state, action) => {
      state.ui.needToMove = action.payload;
    },
    setDefaultChannel: (state, action) => {
      state.ui.defaultChannel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, { error }) => {
        console.log(JSON.stringify(error, null, 2));
        if (error.name === 'AxiosError' && error.message.endsWith('401')) {
          state.error = 'unauthorized';
        }
        state.loadingStatus = 'idle';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.setMany(state, channels);
        state.ui.defaultChannel = currentChannelId;
        state.ui.active = currentChannelId;
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
  setNeedToMove,
  setDefaultChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
