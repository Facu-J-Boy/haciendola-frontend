import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../interfaces/product';
import { axiosInstance } from '../../config/axios';

export const editProduct = createAsyncThunk(
  'editProduct',
  async (data: Product) => {
    try {
      const {
        id,
        title,
        description,
        grams,
        stock,
        price,
        comparePrice,
      } = data;
      const response = await axiosInstance.put(
        `/product/update/${id}`,
        { title, description, grams, stock, price, comparePrice }
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
