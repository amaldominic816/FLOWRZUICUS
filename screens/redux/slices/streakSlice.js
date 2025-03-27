// streakSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk to fetch streak data from the API using credentials from AsyncStorage
export const fetchStreakData = createAsyncThunk(
  'streak/fetchStreakData',
  async (_, { rejectWithValue }) => {
    try {
      // Get username and password from AsyncStorage
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');

      // Check if credentials exist
      if (!username || !password) {
        throw new Error('Missing authentication credentials');
      }

      const response = await axios.get('http://192.168.0.100:8000/api/streaks/streaks/', {
        auth: {
          username: username,
          password: password,
        },
      });
      // Assuming the API returns one result
      return response.data.results[0];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || 'Failed to fetch streak data'
      );
    }
  }
);

const streakSlice = createSlice({
  name: 'streak',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreakData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStreakData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStreakData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default streakSlice.reducer;
