import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';

export const productsList = createAsyncThunk(
  'productsList',
  async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/product/list/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
