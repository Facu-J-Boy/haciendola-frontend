import { createSlice } from '@reduxjs/toolkit';
import { productsList } from '../actions/productsList';
import { Product } from '../../interfaces/product';
import { deleteProduct } from '../actions/deleteProduct';
import { createProduct } from '../actions/createProduct';

export interface productsState {
  products: Product[] | [];
  productsLoading: boolean;
  loadingList: boolean;
}

const initialState: productsState = {
  products: [],
  productsLoading: false,
  loadingList: false,
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
      })
      .addCase(createProduct.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const { product } = action.payload;
        state.products = product &&
          state.products && [product, ...state.products];
        state.productsLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.productsLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products = state.products.filter(
          (product) => product.id !== action.payload.product?.id
        );
        state.loadingList = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loadingList = false;
      });
  },
});

export default productsSlice.reducer;
