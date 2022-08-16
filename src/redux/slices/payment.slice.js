import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPayments = createAsyncThunk('payment/getPayments', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/payment/list`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const paymentInitialState = {
  getPaymentsState: {
    data: null,
    loading: false,
    error: null,
  },
  activePayment: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: paymentInitialState,
  reducers: {},
  extraReducers: {
    [getPayments.pending]: (state, action) => {
      state.getPaymentsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getPayments.fulfilled]: (state, action) => {
      state.getPaymentsState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getPayments.rejected]: (state, action) => {
      state.getPaymentsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { paymentReset } = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;
