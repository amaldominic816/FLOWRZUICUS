import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode } from 'base-64';

// Base URL for your API endpoints
const baseUrl = 'http://192.168.0.102:8000/api';

// Helper function to get basic auth header from AsyncStorage
const getAuthHeader = async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');
  if (username && password) {
    const token = encode(`${username}:${password}`);
    return { Authorization: `Basic ${token}` };
  }
  return {};
};

// Thunk to fetch the cart (GET /api/carts/)
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${baseUrl}/carts/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      // Assuming the cart you want is the first in the results array
      return data.results[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to add an item to the cart (POST /api/cart/carts/{cartId}/add_item/)
export const addItem = createAsyncThunk(
  'cart/addItem',
  async ({ cartId, productId, quantity }, thunkAPI) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${baseUrl}/cart/carts/${cartId}/add_item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const data = await response.json();
      // API returns the updated cart
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to increase an item's quantity (POST /api/cart/carts/increase_quantity/)
export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async (itemId, thunkAPI) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${baseUrl}/cart/carts/increase_quantity/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ item_id: itemId }),
      });
      if (!response.ok) {
        throw new Error('Failed to increase quantity');
      }
      const data = await response.json();
      // API returns the updated item data in data.data
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to decrease an item's quantity (POST /api/cart/carts/decrease_quantity/)
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (itemId, thunkAPI) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${baseUrl}/cart/carts/decrease_quantity/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ item_id: itemId }),
      });
      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }
      const data = await response.json();
      // API returns the updated item data in data.data
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to remove an item from the cart (POST /api/cart/carts/{cartId}/remove_item/)
export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async ({ cartId, itemId }, thunkAPI) => {
    try {
      const headers = await getAuthHeader();
      const response = await fetch(`${baseUrl}/cart/carts/${cartId}/remove_item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ item_id: itemId }),
      });
      // Expecting a 204 status code
      if (response.status !== 204) {
        throw new Error('Failed to remove item');
      }
      // Return the removed item id to update state
      return itemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state for the cart slice
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// Create the cart slice with reducers and extraReducers for the thunks
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart cases
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add item cases (updates the whole cart)
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Increase quantity cases (updates a single item)
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart && state.cart.items) {
          const index = state.cart.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.cart.items[index] = action.payload;
            // Optionally recalculate total amount
            state.cart.total_amount = state.cart.items.reduce(
              (sum, item) => sum + parseFloat(item.total_price),
              0
            );
          }
        }
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Decrease quantity cases (updates a single item)
      .addCase(decreaseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart && state.cart.items) {
          const index = state.cart.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.cart.items[index] = action.payload;
            state.cart.total_amount = state.cart.items.reduce(
              (sum, item) => sum + parseFloat(item.total_price),
              0
            );
          }
        }
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove item cases
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.cart && state.cart.items) {
          state.cart.items = state.cart.items.filter(
            (item) => item.id !== action.payload
          );
          state.cart.total_amount = state.cart.items.reduce(
            (sum, item) => sum + parseFloat(item.total_price),
            0
          );
          state.cart.items_count = state.cart.items.length;
        }
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
