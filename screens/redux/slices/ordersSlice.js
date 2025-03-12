import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';

const INITIAL_STATE = {
  orders: [],
  count: 0,
  status: 'idle', // 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  if (!username || !password) {
    throw new Error('No credentials found');
  }

  // Make an API call to fetch orders using Basic Auth
  const response = await axios.get('http://192.168.0.102:8000/api/orders/orders/', {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    },
  });

  return response.data; // Expected to have "count" and "results"
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.results; // Save orders array
        state.count = action.payload.count;      // Save total count of orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
