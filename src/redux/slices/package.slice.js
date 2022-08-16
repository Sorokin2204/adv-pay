import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPackage = createAsyncThunk('package/getPackage', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/package/list`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const packageInitialState = {
  getPackageState: {
    data: null,
    loading: false,
    error: null,
  },
  activePackage: null,
};

const packageSlice = createSlice({
  name: 'package',
  initialState: packageInitialState,
  reducers: {
    setActivePackage: (state, { payload }) => {
      state.activePackage = payload;
    },
  },
  extraReducers: {
    // CREATE
    [getPackage.pending]: (state, action) => {
      state.getPackageState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getPackage.fulfilled]: (state, action) => {
      state.getPackageState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getPackage.rejected]: (state, action) => {
      state.getPackageState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { loginPackageReset, setActivePackage } = packageSlice.actions;
export const packageReducer = packageSlice.reducer;
