import api from './axiosInstance';

export const registerUser = async userData => {
  try {
    const response = await api.post('/accounts/users/', userData);
    return response.data; // Return the response data (user info, token, etc.)
  } catch (error) {
    console.error('Registration Error:', error.response?.data || error.message);
    throw error.response?.data || {error: 'Something went wrong!'};
  }
};
export const loginUser = async userData => {
  try {
    const response = await api.post('/login/', userData);
    return response.data; // Return token and user info
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error.response?.data || {error: 'Invalid credentials'};
  }
};
