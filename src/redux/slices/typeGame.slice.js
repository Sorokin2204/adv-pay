import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const findTypeGame = createAsyncThunk('typeGame/findTypeGame', (slug, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue({ error: 'PROBLEM_WITH_TOKEN' });

  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/typeGame/find`, {
      params: {
        slug,
      },
      headers: {
        request_token: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const typeGameInitialState = {
  findTypeGameState: {
    data: null,
    loading: false,
    error: null,
  },
  activeTypeGame: null,
};

const typeGameSlice = createSlice({
  name: 'typeGame',
  initialState: typeGameInitialState,
  reducers: {},
  extraReducers: {
    // CREATE
    [findTypeGame.pending]: (state, action) => {
      state.findTypeGameState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [findTypeGame.fulfilled]: (state, action) => {
      state.findTypeGameState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [findTypeGame.rejected]: (state, action) => {
      state.findTypeGameState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { loginTypeGameReset, setActiveTypeGame } = typeGameSlice.actions;
export const typeGameReducer = typeGameSlice.reducer;
