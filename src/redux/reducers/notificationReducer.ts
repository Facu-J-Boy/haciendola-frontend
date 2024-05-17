import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '../actions/authUser';
import { deleteProduct } from '../actions/deleteProduct';
import { createProduct } from '../actions/createProduct';
import { editProduct } from '../actions/editProduct';

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
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action: any) => {
        state.message = action.payload.msg;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.message = action.payload.msg;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.message = action.payload.msg;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.message = action.payload.msg;
      });
  },
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
