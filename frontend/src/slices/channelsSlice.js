/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: {
    entities: {
      1: {
        id: 1,
        name: 'general',
        removable: false,
      },
      2: {
        id: 2,
        name: 'random',
        removable: false,
      },
    },
    ids: ['1', '2'],
  },
};

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
});

export const { addChannel, removeChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
