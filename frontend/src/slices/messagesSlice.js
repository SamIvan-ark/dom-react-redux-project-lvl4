/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChannels, removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setMany(state, messages);
      })
      .addCase(removeChannel, (state, action) => {
        const removedChannelId = action.payload;
        const restMessages = Object
          .values(state.entities)
          .filter((message) => message.channelId !== removedChannelId);
        messagesAdapter.setAll(state, restMessages);
      });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
