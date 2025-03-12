import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Buffer } from 'buffer';

const USER_DETAILS_URL = 'http://192.168.0.102:8000/auth/users/';

export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (_, { rejectWithValue }) => {
    try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        // Check if username and password are available
        if (!username || !password) {
            throw new Error('Authentication credentials not available');
        }

        const credentials = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await axios.get(USER_DETAILS_URL, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
        });

        // Debug the response structure
        console.log('User details response:', response.data);
        
        // Ensure the response contains results before returning
        if (response.data && response.data.results && response.data.results.length > 0) {
            return response.data.results[0]; // Return the user data
        } else {
            throw new Error('No user details found');
        }
    } catch (error) {
        // Log detailed error information for debugging
        console.error('Failed to fetch user details:', error);
        return rejectWithValue(error.response?.data || error.message || 'Failed to fetch user details');
    }
});
