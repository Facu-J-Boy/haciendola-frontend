import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: string | undefined) => {
    try {
      const response = await axiosInstance.delete(
        `/product/delete/${productId}`
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
