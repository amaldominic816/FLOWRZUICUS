// walletSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Fetch wallet balance
export const fetchWalletBalance = createAsyncThunk('wallet/fetchBalance', async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  const response = await axios.get('http://192.168.0.100:8000/api/wallet/wallet/', {
    auth: {
      username: username,
      password: password,
    },
  });

  return response.data.results[0].balance; // Extract balance from API response
});

// Fetch wallet transactions
export const fetchTransactions = createAsyncThunk('wallet/fetchTransactions', async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  const response = await axios.get('http://192.168.0.100:8000/api/wallet/transactions/', {
    auth: {
      username: username,
      password: password,
    },
  });

  return response.data.results; // Extract transactions from API response
});

// Add funds to the wallet
export const addFunds = createAsyncThunk('wallet/addFunds', async (amount) => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  const response = await axios.post(
    'http://192.168.0.100:8000/api/wallet/wallet/1/add_funds/',
    {
      amount: amount,
      payment_method: 'credit_card', // Hardcoded payment method
    },
    {
      auth: {
        username: username,
        password: password,
      },
    }
  );

  return response.data.balance; // Extract updated balance from API response
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: null,
    transactions: [],
    status: 'idle',
    error: null,
    addFundsStatus: 'idle', // For tracking add funds status
    addFundsError: null, // For tracking any error while adding funds
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFunds.pending, (state) => {
        state.addFundsStatus = 'loading';
      })
      .addCase(addFunds.fulfilled, (state, action) => {
        state.addFundsStatus = 'succeeded';
        state.balance = action.payload; // Update balance with the new value
      })
      .addCase(addFunds.rejected, (state, action) => {
        state.addFundsStatus = 'failed';
        state.addFundsError = action.error.message;
      });
  },
});

export default walletSlice.reducer;
