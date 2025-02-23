import api from './api';

const apiService = {
  login: {
    loginurl: () => api.get('api/login/'),
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
