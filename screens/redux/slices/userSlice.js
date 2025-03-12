// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Buffer} from 'buffer';

const INITIAL_STATE = {
  user: null,
  status: 'idle', // loading | succeeded | failed
  error: null,
};

export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  if (!username || !password) {
    throw new Error('No credentials found');
  }

  // Make an API call to fetch user details
  const response = await axios.get('http://192.168.0.102:8000/auth/users/', {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    },
  });

  return response.data; // Return the fetched user data
});

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Save user data
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Handle error
      });
  },
});

export default userSlice.reducer;
