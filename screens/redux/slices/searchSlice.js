import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'search/fetchProducts',
  async (query, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'http://192.168.0.102:8000/api/product/search/',
        {params: {q: query}},
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Network Error');
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {products: [], loading: false, error: null},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default searchSlice.reducer;
