import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';

export const authUser = createAsyncThunk(
  'authUser',
  async (data: { user: string; password: string }) => {
    try {
      const response = await axiosInstance.get(
        `/user/auth/${data.user}/${data.password}`
      );
      console.log('user: ', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
