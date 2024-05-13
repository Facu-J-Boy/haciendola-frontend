import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';
import { user } from '../reducers/userReducer';
import { userId } from '../../utils/userId';

export interface autResponse {
  user: user | null;
  mesg: string | null;
}

export const authUser = createAsyncThunk(
  'authUser',
  async (data: {
    user: string;
    password: string;
  }): Promise<autResponse> => {
    try {
      const response = await axiosInstance.get(
        `/user/auth/${data.user}/${data.password}`
      );
      response && userId.set(response.data.user.id);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return error.response.data;
    }
  }
);
