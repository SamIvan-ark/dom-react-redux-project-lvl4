/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
