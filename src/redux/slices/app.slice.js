import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVkReviews = createAsyncThunk('vkReviews/getVkReviews', (page, { rejectWithValue }) => {
  let offset = 30 * page;
  return axios
    .get(`https://api.vk.com/method/board.getComments?v=5.131&group_id=213480825&topic_id=48841807&access_token=484899304848993048489930764b584f4944848484899302b79180d8fb65f87bb71e34a&extended=1&count=30&lang=0&sort=desc&offset=${offset}`, {})
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const vkReviewsInitialState = {
  getVkReviewsState: {
    data: null,
    loading: false,
    error: null,
  },
};
const setProfileToComment = (list) => {
  return list?.items.map((item) => {
    let profile = list?.profiles?.find((prof) => prof?.id === item?.from_id || -prof?.id === item?.from_id);
    if (profile) {
      item.profile = profile;
    } else {
      let group = list?.groups?.find((prof) => -prof?.id === item?.from_id);
      if (group) {
        item.group = group;
      }
    }
  });
};
const vkReviewsSlice = createSlice({
  name: 'vkReviews',
  initialState: vkReviewsInitialState,
  reducers: {
    resetVkReviews: (state, { payload }) => {
      state.getVkReviewsState = vkReviewsInitialState.getVkReviewsState;
    },
  },
  extraReducers: {
    [getVkReviews.pending]: (state, action) => {
      state.getVkReviewsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getVkReviews.fulfilled]: (state, action) => {
      let data = setProfileToComment(action.payload.response);
      state.getVkReviewsState = {
        loading: false,
        data: action.payload.response,
        error: null,
      };
    },
    [getVkReviews.rejected]: (state, action) => {
      state.getVkReviewsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { resetVkReviews } = vkReviewsSlice.actions;
export const vkReviewsReducer = vkReviewsSlice.reducer;
