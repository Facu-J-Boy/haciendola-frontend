import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';

export const getSingleProduct = createAsyncThunk(
  'getSingleProduct',
  async (productId: string | undefined) => {
    try {
      const response = await axiosInstance.get(
        `/product/single/${productId}`
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
