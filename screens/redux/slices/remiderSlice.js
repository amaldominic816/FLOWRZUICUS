import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.100:8000/api/reminder/reminders/';

// Async thunk to fetch reminders from the API
export const fetchReminders = createAsyncThunk(
  'reminders/fetchReminders',
  async (_, thunkAPI) => {
    try {
      // Retrieve username and password from AsyncStorage
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');

      const response = await axios.get(API_URL, {
        auth: { username, password },
      });
      // Returns the full response data (expecting count and results)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const remindersSlice = createSlice({
  name: 'reminders',
  initialState: {
    reminders: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional reducers for local state modifications (e.g., add, update, delete reminder)
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    updateReminder: (state, action) => {
      const index = state.reminders.findIndex(
        reminder => reminder.id === action.payload.id
      );
      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        reminder => reminder.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        // Assumes the API response contains a "results" array with reminders data
        state.reminders = action.payload.results;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addReminder, updateReminder, deleteReminder } = remindersSlice.actions;

export default remindersSlice.reducer;
