import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "unauthenticated",
    user: {},
    errorMessage: null,
  },
  reducers: {
    setCheckingStatus: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = "unauthenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setCheckingStatus, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions;
