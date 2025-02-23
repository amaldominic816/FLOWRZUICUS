import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../api/apiService';

const initialState = {
  banners: [],
  loading: false,
  error: null,
};

// Async thunk to fetch occasion banners
export const fetchOccasionBanners = createAsyncThunk(
  'occasion/fetchOccasionBanners',
  async () => {
    const response = await apiService.occasion.fetchBanners();
    return response.data.results;
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
