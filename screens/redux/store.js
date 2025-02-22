// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your actual reducers
import  userReducer  from './slices/userSlice';
import storesReducer from './slices/storesSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer, 
    // Add other reducers here
    user: userReducer,
    stores: storesReducer,
  },
});
