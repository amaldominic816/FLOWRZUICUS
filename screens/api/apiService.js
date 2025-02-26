import api from './api';
import axios from 'axios';
const BASE_URL = 'http://192.168.0.102:8000/api';


const apiService = {
  login: {
    loginurl: (username, password) => 
      axios.post(`${BASE_URL}/login/`, { username, password }, {
        headers: { 'Content-Type': 'application/json' },
      }),
  },
  user: {
    fetchprofile: () => api.get('auth/users/'),
  },
  stores: {
    fetchAll: () => api.get('api/vendor/vendors/'),
  },
  product: {
    fetchAll: () => api.get('api/product/products/'),
  },
  categories: {
    fetchcategoriesurl: () => api.get('api/product/categories/'),
  },

  occasion: {
    fetchBanners: () => api.get('api/product/occasion/'),
  },
};

export default apiService;
