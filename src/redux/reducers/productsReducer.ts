import { createSlice } from '@reduxjs/toolkit';
import { productsList } from '../actions/productsList';
import { Product } from '../../interfaces/product';

export interface productsState {
  products: Product[] | [];
  productsLoading: boolean;
}

const initialState: productsState = {
  products: [],
  productsLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsList.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productsLoading = false;
      })
      .addCase(productsList.rejected, (state) => {
        state.productsLoading = false;
      });
  },
});

export default productsSlice.reducer;
