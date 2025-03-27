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
import searchReducer from './slices/searchSlice';
import createorderReducer from './slices/createorderSlice';
import eventStoreReducer from './slices/eventStoreSlice';
import eventProductsReducer from './slices/eventProductsSlice';
import bookingReducer from './slices/bookingSlice';
import bookingsReducer from './slices/bookingsSlice.js';
import bookingdetailsReducer from './slices/bookingDetailsSlice.js';
import sendGiftCardReducer from './slices/sendGiftCardSlice.js';
import walletReducer from './slices/walletSlice';
import notificationSlice from './slices/notificationSlice';
import streakReducer from './slices/streakSlice.js';








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
    createOrder:createorderReducer,
    search: searchReducer,

    notifications: notificationSlice,

    streakData :streakReducer,


    events: eventStoreReducer,
    eventProducts: eventProductsReducer,
    booking: bookingReducer,
    bookings:bookingsReducer,
    bookingDetails:bookingdetailsReducer,


    giftCard:sendGiftCardReducer,

    wallet: walletReducer,
  },
});
