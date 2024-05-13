import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';
import { userId } from '../../utils/userId';

export const userSession = createAsyncThunk(
  'userSession',
  async () => {
    try {
      const response = await axiosInstance.get(
        `/user/session/${userId.get()}`
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
