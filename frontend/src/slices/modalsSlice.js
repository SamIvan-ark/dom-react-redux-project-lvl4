/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  invokedOn: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, invokedOn = null } = action.payload;
      state.type = type;
      state.invokedOn = invokedOn;
    },
    closeModal: (state) => {
      state.type = null;
      state.invokedOn = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
