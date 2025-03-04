import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk('showCart/fetchCartItems', async () => {
  const username = await AsyncStorage.getItem('username'); // Adjust the key if needed
  const password = await AsyncStorage.getItem('password'); // Adjust the key if needed

  const response = await axios.get('http://192.168.0.100:8000/api/cart/', {
    auth: {
      username,
      password,
    },
  });
  console.log(response.data); // Log entire response to see its structure

  return response.data.results[0].items; // Adjust as needed based on your data structure
});

const showCartSlice = createSlice({
  name: 'showCart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default showCartSlice.reducer;
