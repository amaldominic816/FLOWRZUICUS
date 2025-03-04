import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/api', // Your backend API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add Authorization token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
