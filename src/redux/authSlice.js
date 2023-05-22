import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  requestOtp: false,
  isLoading: false,
  successMessage: null,
  errorMessage: null,
  navigate: false,
  userData: null,
  image: {},
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
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.requestOtp = false;
      localStorage.clear();
    },
    clear(state) {
      state.errorMessage = null;
      state.successMessage = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUSerData(state, action) {
      state.userData = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  setRequestOTP,
  logout,
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
  clear,
  setUSerData,
  setImage,
} = authSlice.actions;

export default authSlice.reducer;
