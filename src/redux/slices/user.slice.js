import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createUser = createAsyncThunk('user/createUser', (user, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/add`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const googleLoginUser = createAsyncThunk('user/googleLoginUser', (user, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/google-auth`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const loginUser = createAsyncThunk('user/loginUser', (user, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/login`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const resetPasswordUser = createAsyncThunk('user/resetPasswordUser', ({ name, email }, { rejectWithValue }) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/reset-password`, {
      name,
      email,
    })
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

export const generatePromoCode = createAsyncThunk('user/generatePromocode', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/user/generate-promo-code`,
      {},
      {
        headers: {
          request_token: token,
        },
      },
    )
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
export const initPaymentCard = createAsyncThunk('user/initPaymentCard', (data, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .post(`${process.env.REACT_APP_SERVER_URL}/user/init-payment`, data, {
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
  resetPasswordUserState: {
    data: null,
    loading: false,
    error: null,
  },
  generatePromoCodeState: {
    data: null,
    loading: false,
    error: null,
  },
  googleLoginUserState: {
    data: null,
    loading: false,
    error: null,
  },
  initPaymentCardState: {
    data: null,
    loading: false,
    error: null,
  },
  activeUser: null,
  isAuth: false,
  cart: null,
  updateCartEmpty: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setUpdateCartEmpty: (state, action) => {
      state.updateCartEmpty = {};
    },
    loginUserReset: (state, action) => {
      state.loginUserState = userInitialState.loginUserState;
    },
    googleLoginReset: (state, action) => {
      state.googleLoginUserState = userInitialState.googleLoginUserState;
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
    resetPasswordUserReset: (state, action) => {
      state.resetPasswordUserState = userInitialState.resetPasswordUserState;
    },
    resetInitPaymentCardState: (state, action) => {
      state.initPaymentCardState = userInitialState.initPaymentCardState;
    },
    resetGeneratePromoCode: (state, action) => {
      state.generatePromoCodeState = userInitialState.generatePromoCodeState;
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
      localStorage.removeItem('token');
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
    // RESET PASSWORD
    [resetPasswordUser.pending]: (state, action) => {
      state.resetPasswordUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },

    [resetPasswordUser.fulfilled]: (state, action) => {
      state.resetPasswordUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [resetPasswordUser.rejected]: (state, action) => {
      state.resetPasswordUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [generatePromoCode.pending]: (state, action) => {
      state.generatePromoCodeState = {
        loading: true,
        data: null,
        error: null,
      };
    },

    [generatePromoCode.fulfilled]: (state, action) => {
      state.generatePromoCodeState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [generatePromoCode.rejected]: (state, action) => {
      state.generatePromoCodeState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [googleLoginUser.pending]: (state, action) => {
      state.googleLoginUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },

    [googleLoginUser.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.googleLoginUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [googleLoginUser.rejected]: (state, action) => {
      state.googleLoginUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [initPaymentCard.pending]: (state, action) => {
      state.initPaymentCardState = {
        loading: true,
        data: null,
        error: null,
      };
    },

    [initPaymentCard.fulfilled]: (state, action) => {
      state.initPaymentCardState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [initPaymentCard.rejected]: (state, action) => {
      state.initPaymentCardState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { loginUserReset, setActiveUser, checkUserReset, createUserReset, resetPasswordUserReset, resetGeneratePromoCode, googleLoginReset, setCart, setUpdateCartEmpty, resetInitPaymentCardState } = userSlice.actions;
export const userReducer = userSlice.reducer;
