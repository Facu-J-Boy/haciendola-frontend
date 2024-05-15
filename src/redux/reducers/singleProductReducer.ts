import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../interfaces/product';
import { getSingleProduct } from '../actions/getSingleProduct';

export interface singleProductState {
  product: Product | null;
  singleProductLoading: boolean;
}

const initialState: singleProductState = {
  product: null,
  singleProductLoading: false,
};

const singleProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.singleProductLoading = false;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.singleProductLoading = false;
      });
  },
});

export const { clearProduct } = singleProductSlice.actions;

export default singleProductSlice.reducer;
