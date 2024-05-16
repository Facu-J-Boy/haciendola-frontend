import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios';
import { Product } from '../../interfaces/product';

interface CreateProductPayload {
  userId: string | null;
  data: Product;
}

export const createProduct = createAsyncThunk(
  'createProduct',
  async (payload: CreateProductPayload) => {
    const { userId, data } = payload;
    try {
      const response = await axiosInstance.post(
        `/product/create/${userId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
