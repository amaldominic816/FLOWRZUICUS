// orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk to create an order with credentials retrieved from AsyncStorage
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // Retrieve credentials from AsyncStorage
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      
      if (!username || !password) {
        throw new Error('No credentials found in AsyncStorage');
      }

      // Make the API call with basic authentication
      const response = await axios.post(
        'http://192.168.0.102:8000/api/orders/orders/',
        orderData,
        {
          auth: {
            username,
            password,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const createorderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Additional synchronous actions can be added here if needed.
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createorderSlice.reducer;
