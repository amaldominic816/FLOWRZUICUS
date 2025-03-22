import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { encode } from 'base-64';  // Import from the base-64 package

// Define the initial state
const initialState = {
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  bookingResponse: null,
};

// Create an async thunk to handle booking creation
export const createBooking = createAsyncThunk(
  'events/createBooking',
  async ({ event_product, quantity, start_date, end_date, notes }, { rejectWithValue }) => {
    try {
      // Retrieve credentials from AsyncStorage
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      
      if (!username || !password) {
        throw new Error('No credentials found in AsyncStorage');
      }

      // Prepare the authorization header using base64 encoding
      const authHeader = `Basic ${encode(`${username}:${password}`)}`;

      // Prepare the request body
      const orderData = {
        event_product,
        quantity,
        start_date,
        end_date,
        notes,
      };

      console.log('Preparing to send booking request with data:', orderData);

      // Make the API call with basic authentication using axios
      const response = await axios.post(
        'http://192.168.0.100:8000//api/events/bookings/',
        orderData,
        {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Booking created successfully:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookingResponse = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log('Booking creation failed:', action.payload); // Log error here
      });
  },
});

export default bookingSlice.reducer;
