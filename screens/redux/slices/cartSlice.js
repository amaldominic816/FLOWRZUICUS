// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk for adding item to cart
export const addItemToCart = createAsyncThunk('cart/addItem', async (item) => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');

  const response = await axios.post(
    'http://192.168.0.102:8000/api/cart/add_item/',
    item,
    {
      auth: { username, password },
    },
  );

  console.log("API add item response:", response.data);
  return response.data;
});


// Define async thunks for increasing and decreasing quantity
export const increaseItemQuantity = createAsyncThunk(
  'cart/increaseItem',
  async (itemId) => {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    const response = await axios.post(
      'http://192.168.0.102:8000/api/cart/increase_quantity/',
      { item_id: itemId },
      { auth: { username, password }},
    );

    return response.data; // Ensure this returns { product: { id: ... }, quantity: newQuantity }
  }
);

export const decreaseItemQuantity = createAsyncThunk(
  'cart/decreaseItem',
  async (itemId) => {
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');

    const response = await axios.post(
      'http://192.168.0.102:8000/api/cart/decrease_quantity/',
      { item_id: itemId },
      { auth: { username, password }},
    );

    return response.data; // Ensure this returns { product: { id: ... }, quantity: newQuantity }
  }
);

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      })
      .addCase(increaseItemQuantity.fulfilled, (state, action) => {
        const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        }
      })
      .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
        const existingItemIndex = state.items.findIndex((item) => item.product.id === action.payload.product.id);
        if (existingItemIndex >= 0) {
          if (action.payload.quantity > 0) {
            state.items[existingItemIndex].quantity = action.payload.quantity;
          } else {
            state.items.splice(existingItemIndex, 1);
          }
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(increaseItemQuantity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(decreaseItemQuantity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
