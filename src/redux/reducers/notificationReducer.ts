import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '../actions/authUser';

export interface notificationState {
  message: string | null;
}

const initialState: notificationState = {
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification: (state) => {
      console.log('clearNotification ejecutado');
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action: any) => {
      state.message = action.payload.msg;
    });
  },
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
