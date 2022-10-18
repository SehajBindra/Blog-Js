import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    FetchStart: (state) => {
      state.loading = true;
    },

    FetchSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    FetchFaliure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { FetchStart, FetchSuccess, FetchFaliure } = postSlice.actions;

export default postSlice.reducer;
