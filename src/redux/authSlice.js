import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  requestOtp: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setRequestOTP(state, action) {
      state.requestOtp = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.requestOtp = false;
      localStorage.clear();
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  setRequestOTP,
  logout,
  setIsLoading,
} = authSlice.actions;

export default authSlice.reducer;
