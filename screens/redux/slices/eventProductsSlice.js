import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  products: [],
  productDetails: null,
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Create an async thunk to fetch all products
export const fetchEventProducts = createAsyncThunk(
  'events/fetchEventProducts',
  async () => {
    const response = await fetch('http://192.168.0.100:8000/api/events/products/');
    const data = await response.json();
    return data.results; // Return the event products from the API response
  }
);

// Create an async thunk to fetch product details by ID
export const fetchProductDetails = createAsyncThunk(
  'events/fetchProductDetails',
  async (id) => {
    const response = await fetch(`http://192.168.0.100:8000/api/events/products/${id}/`);
    const data = await response.json();
    return data; // Return the product details from the API response
  }
);

// Create the slice
const eventProductsSlice = createSlice({
  name: 'eventProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching all products
    builder
      .addCase(fetchEventProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchEventProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Fetching product details by ID
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventProductsSlice.reducer;
