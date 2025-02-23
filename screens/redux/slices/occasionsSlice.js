import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  banners: [],
  loading: false,
  error: null,
};

// Async thunk to fetch occasion banners
export const fetchOccasionBanners = createAsyncThunk(
  'occasion/fetchOccasionBanners',
  async () => {
    const response = await axios.get('http://192.168.0.102:8000/api/product/occasion/');
    return response.data.results; // Returning only the results array
  }
);

const occasionSlice = createSlice({
  name: 'occasion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccasionBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOccasionBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload; // Store fetched banners in the state
      })
      .addCase(fetchOccasionBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture the error message
      });
  },
});

export default occasionSlice.reducer;
