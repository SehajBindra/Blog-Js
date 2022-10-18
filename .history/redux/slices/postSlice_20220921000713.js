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
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },

    loginFaliure: (state) => {
      state.loading = false;
      state.error = true;
    },

    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFaliure, logout } =
  postSlice.actions;

export default postSlice.reducer;
