// redux/slices/sendGiftCardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendGiftCard = createAsyncThunk(
  'giftCard/sendGiftCard',
  async ({ amount, recipient_email, recipient_name, message, expiry_date }, { rejectWithValue }) => {
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const response = await axios.post(
        'http://192.168.0.100:8000/api/gift-cards/',
        { amount, recipient_email, recipient_name, message, expiry_date },
        {
          headers: {
            Authorization: `Basic ${btoa(username + ":" + password)}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

const sendGiftCardSlice = createSlice({
  name: 'giftCard',
  initialState: {
    giftCard: null,
    status: 'idle',
    error: null,
    successMessage: null,
  },
  reducers: {
    resetGiftCardState: (state) => {
      state.giftCard = null;
      state.status = 'idle';
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendGiftCard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendGiftCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.giftCard = action.payload;
        state.successMessage = 'Gift Sent Successfully';
      })
      .addCase(sendGiftCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to send gift';
      });
  },
});

export const { resetGiftCardState } = sendGiftCardSlice.actions;
export default sendGiftCardSlice.reducer;
