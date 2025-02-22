// storesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://192.168.0.102:8000/api/vendor/vendors/';

// Thunk to fetch all stores
export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results; // Return the stores
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch stores.');
  }
});

// Create the stores slice
const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload; // Set the stores in state
        state.error = null;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

// Export the reducer
export default storesSlice.reducer;
