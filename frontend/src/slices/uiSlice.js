/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    type: null,
    invokedOn: null,
  },
  channels: {
    activeChannel: null,
    defaultChannel: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, invokedOn = null } = action.payload;
      state.modal.type = type;
      state.modal.invokedOn = invokedOn;
    },
    closeModal: (state) => {
      state.modal.type = null;
      state.modal.invokedOn = null;
    },
    setActive: (state, action) => {
      state.channels.activeChannel = action.payload;
    },
    setDefaultChannel: (state, action) => {
      state.channels.defaultChannel = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setActive,
  setDefaultChannel,
} = uiSlice.actions;

export default uiSlice.reducer;
