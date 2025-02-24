// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Define initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for adding item to cart
export const addItemToCart = createAsyncThunk('cart/addItem', async (item) => {
  // Retrieve the username and password from AsyncStorage
  const username = await AsyncStorage.getItem('username'); // Adjust the key if needed
  const password = await AsyncStorage.getItem('password'); // Adjust the key if needed
  
  // Make the API call with basic authentication
  const response = await axios.post('http://192.168.0.102:8000/api/cart/add_item/', item, {
    auth: {
      username,
      password,
    },
  });

  return response.data; // Return the response data
});

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // You can add other reducers here
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Update the state to include the new item
        state.items.push(action.payload);
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
