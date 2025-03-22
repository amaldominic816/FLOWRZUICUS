// redux/slices/bookingDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchBookingDetails = createAsyncThunk(
  'bookingDetails/fetchBookingDetails',
  async (bookingId) => {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    const response = await axios.get(
      `http://192.168.0.100:8000/api/events/bookings/${bookingId}/`,
      {
        headers: {
          Authorization: `Basic ${btoa(username + ":" + password)}`,
        },
      }
    );
    return response.data;
  }
);

const bookingDetailsSlice = createSlice({
  name: 'bookingDetails',
  initialState: {
    bookingDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookingDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookingDetails = action.payload;
      })
      .addCase(fetchBookingDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bookingDetailsSlice.reducer;
