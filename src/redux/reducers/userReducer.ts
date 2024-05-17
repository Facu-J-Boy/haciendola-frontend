import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '../actions/authUser';
import { userSession } from '../actions/userSession';

export interface user {
  id: string;
  user: string;
}

export interface userState {
  User: user | null | undefined;
  sessionLoading: boolean;
  userLoading: boolean;
}

const initialState: userState = {
  User: null,
  sessionLoading: false,
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
        const { user } = action.payload;
        state.User = user;
        state.userLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.userLoading = false;
      })
      .addCase(userSession.pending, (state) => {
        state.sessionLoading = true;
      })
      .addCase(userSession.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.User = user;
        state.sessionLoading = false;
      })
      .addCase(userSession.rejected, (state) => {
        state.sessionLoading = false;
      });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
