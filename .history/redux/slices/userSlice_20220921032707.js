import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Currentuser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.Currentuser = action.payload;
    },

    loginFaliure: (state) => {
      state.loading = false;
      state.error = true;
    },

    logout: (state) => {
      state.Currentuser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFaliure, logout } =
  userSlice.actions;

export const Currentuser = (state) => state.user.Currentuser;

export default userSlice.reducer;
