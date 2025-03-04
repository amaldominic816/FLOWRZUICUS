import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/', // Set your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
