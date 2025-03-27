// notificationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';

const INITIAL_STATE = {
  notifications: [],
  status: 'idle', // loading | succeeded | failed
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    if (!username || !password) {
      throw new Error('No credentials found');
    }

    // Make an API call to fetch notifications
    const response = await axios.get('http://192.168.0.100:8000/api/notifications/notifications/', {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
      },
    });

    return response.data; // Return the fetched notifications
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload.results; // Save notifications
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Handle error
      });
  },
});

export default notificationsSlice.reducer;
