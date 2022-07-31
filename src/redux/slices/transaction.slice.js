import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTransaction = createAsyncThunk('transaction/createTransaction', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .post(`https://idv-back.herokuapp.com/v1/transaction/create`, obj, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getTransactions = createAsyncThunk('transaction/getTransactions', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`https://idv-back.herokuapp.com/v1/transaction/list`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const transactionInitialState = {
  createTransactionState: {
    data: null,
    loading: false,
    error: null,
  },
  getTransactionsState: {
    data: null,
    loading: false,
    error: null,
  },
  activeTransaction: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: transactionInitialState,
  reducers: {
    setActiveTransaction: (state, { payload }) => {
      state.activeTransaction = payload;
    },
    createTransactionReset: (state, { payload }) => {
      state.createTransactionState = transactionInitialState.createTransactionState;
    },
  },
  extraReducers: {
    // CREATE
    [createTransaction.pending]: (state, action) => {
      state.createTransactionState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createTransaction.fulfilled]: (state, action) => {
      state.createTransactionState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [createTransaction.rejected]: (state, action) => {
      state.createTransactionState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [getTransactions.pending]: (state, action) => {
      state.getTransactionsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.getTransactionsState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getTransactions.rejected]: (state, action) => {
      state.getTransactionsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { transactionReset, setActiveTransaction, createTransactionReset } = transactionSlice.actions;
export const transactionReducer = transactionSlice.reducer;
