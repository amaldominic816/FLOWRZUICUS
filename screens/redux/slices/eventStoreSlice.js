// eventStoreSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  stores: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Create an async thunk to fetch stores
export const fetchStores = createAsyncThunk(
  'events/fetchStores',
  async () => {
    const response = await fetch('http://192.168.0.100:8000/api/events/vendors/');
    const data = await response.json();
    return data.results; // Return the stores from the API response
  }
);

// Create the slice
const eventStoreSlice = createSlice({
  name: 'eventStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventStoreSlice.reducer;
