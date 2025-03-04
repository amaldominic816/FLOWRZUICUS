// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your actual reducers
import  userReducer  from './slices/userSlice';
import storesReducer from './slices/storesSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import occasionReducer from './slices/occasionsSlice';
import cartReducer from './slices/cartSlice';
import showCartReducer from './slices/showCartSlice'; // Import the renamed reducer
import orderReducer from './slices/ordersSlice';




export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    stores: storesReducer,
    products: productsReducer,
    categories: categoriesReducer,
    occasion: occasionReducer,
    cart: cartReducer,
    showCart: showCartReducer,
    orders:orderReducer,
  },
});
