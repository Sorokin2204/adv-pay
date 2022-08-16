import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createUser = createAsyncThunk('user/createUser', (user, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/add`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const loginUser = createAsyncThunk('user/loginUser', (user, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/login`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getUser = createAsyncThunk('user/getUser', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const checkUser = createAsyncThunk('user/checkUser', (ids, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/user/check/${ids.playerId}/${ids.serverId}`, {
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const userInitialState = {
  createUserState: {
    data: null,
    loading: false,
    error: null,
  },
  getUserState: {
    data: null,
    loading: false,
    error: null,
  },
  loginUserState: {
    data: null,
    loading: false,
    error: null,
  },
  checkUserState: {
    data: null,
    loading: false,
    error: null,
  },
  activeUser: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    loginUserReset: (state, action) => {
      state.loginUserState = userInitialState.loginUserState;
    },
    createUserReset: (state, action) => {
      state.createUserState = userInitialState.createUserState;
    },
    checkUserReset: (state, action) => {
      state.checkUserState = userInitialState.checkUserState;
    },
    setActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },
  },
  extraReducers: {
    // CREATE
    [getUser.pending]: (state, action) => {
      state.getUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getUser.fulfilled]: (state, action) => {
      state.getUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getUser.rejected]: (state, action) => {
      state.getUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // CREATE
    [createUser.pending]: (state, action) => {
      state.createUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createUser.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.createUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [createUser.rejected]: (state, action) => {
      state.createUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },

    // LOGIN
    [checkUser.pending]: (state, action) => {
      state.checkUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [checkUser.fulfilled]: (state, action) => {
      state.checkUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [checkUser.rejected]: (state, action) => {
      state.checkUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // LOGIN
    [loginUser.pending]: (state, action) => {
      state.loginUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.loginUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [loginUser.rejected]: (state, action) => {
      state.loginUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { loginUserReset, setActiveUser, checkUserReset, createUserReset } = userSlice.actions;
export const userReducer = userSlice.reducer;
