// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your actual reducers
import  userReducer  from './slices/userSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer, // Replace with your actual reducers
    // Add other reducers here
    user: userReducer,
  },
});
