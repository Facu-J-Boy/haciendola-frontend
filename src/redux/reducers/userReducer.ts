import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '../actions/authUser';

interface user {
  id: string;
  user: string;
}

export interface userState {
  User: user | null;
  userLoading: boolean;
}

const initialState: userState = {
  User: null,
  userLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.User = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.User = action.payload;
        state.userLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.userLoading = false;
      });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
