// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../api/apiService';


export const fetchProductsByStoreId = createAsyncThunk('products/fetchByStoreId', async (storeId, { rejectWithValue }) => {
  try {
    const response = await apiService.product.fetchAll();
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
