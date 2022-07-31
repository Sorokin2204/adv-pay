import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCreditCard = createAsyncThunk('creditCard/getCreditCard', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`https://idv-back.herokuapp.com/v1/creditCard/list`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const creditCardInitialState = {
  getCreditCardState: {
    data: null,
    loading: false,
    error: null,
  },
  activeCreditCard: null,
};

const creditCardSlice = createSlice({
  name: 'creditCard',
  initialState: creditCardInitialState,
  reducers: {
    setActiveCreditCard: (state, { payload }) => {
      state.activeCreditCard = payload;
    },
  },
  extraReducers: {
    // CREATE
    [getCreditCard.pending]: (state, action) => {
      state.getCreditCardState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getCreditCard.fulfilled]: (state, action) => {
      state.getCreditCardState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getCreditCard.rejected]: (state, action) => {
      state.getCreditCardState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { loginCreditCardReset, setActiveCreditCard } = creditCardSlice.actions;
export const creditCardReducer = creditCardSlice.reducer;
