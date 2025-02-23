// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_PRODUCTS_URL = 'http://192.168.0.102:8000/api/product/products/';

// Thunk to fetch products
export const fetchProductsByStoreId = createAsyncThunk('products/fetchByStoreId', async (storeId, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_PRODUCTS_URL);
    // Filter the products for the specific store ID
    return response.data.results.filter(product => product.vendor === storeId);
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch products.');
  }
});

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByStoreId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByStoreId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByStoreId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default productsSlice.reducer;
