import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiService from '../../api/apiService';


// Thunk for logging in a user
export const loginUser  = createAsyncThunk('auth/loginUser ', async ({ username, password }, { rejectWithValue }) => {
  try {
      // Directly use the URL for the login API
      const response = await axios.post('http://192.168.0.102:8000/api/login/', {
          username,
          password,
      });

      console.log('Response from API:', response.data); // Debugging line

      // Directly access the token
      const token = response.data.token;

      // Store the token and credentials in AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('username', username); // Store username
      await AsyncStorage.setItem('password', password); // Store password
      return { token }; // Return the token only
  } catch (error) {
      console.error('Login error:', error.response);
      return rejectWithValue(error.response?.data || 'Login failed. Please check your credentials.');
  }
});


// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    password: '',
    userDetails: null, // For storing user details
    token: null, // For storing the authentication token
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.username = '';
      state.password = '';
      state.userDetails = null;
      state.token = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('username');
      AsyncStorage.removeItem('password');
    },
  },
  extraReducers: builder => {
    builder
      // Handle fulfilled state for loginUser
       // Handle fulfilled state for loginUser
       .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.meta.arg.username; // Optionally set username from argument
        state.token = action.payload.token; // Store token
        state.loading = false; // Set loading to false on success
        state.error = null; // Clear previous errors
    })
    // Handle pending state for loginUser
    .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true while logging in
    })
    // Handle rejected state for loginUser
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false on failure
        state.error = action.payload; // Store error message
    })

  },
});

// Export action to logout
export const {logout} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
