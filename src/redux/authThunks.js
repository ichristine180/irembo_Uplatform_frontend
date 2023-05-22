import {
  loginSuccess,
  loginFailure,
  setRequestOTP,
  logout,
  setSuccessMessage,
  setErrorMessage,
} from "./authSlice";
import { request } from "./helper";

export const login =
  ({ mobile_no, password }) =>
  async (dispatch) => {
    try {
      await request(dispatch, "/auth/login", { mobile_no, password });
      dispatch(setRequestOTP(true));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(loginFailure());
    }
  };



export const loginWithLink = (token) => async (dispatch) => {
  try {
    const data = await request(dispatch, "/auth/login/link", { token });
    console.log(data);
    if (!data || !data.isSuccessfull) throw new Error("Internal server error");
    _loginSuccesHandler(data, dispatch);
  } catch (error) {
    dispatch(setErrorMessage(error.message));
    dispatch(loginFailure());
  }
};
export const verifyOTP =
  ({ code }) =>
  async (dispatch) => {
    try {
      const data = await request(dispatch, "/auth/verify", { code });
      _loginSuccesHandler(data, dispatch);
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(loginFailure());
    }
  };

export const sendResetLink =
  ({ mobile_no }) =>
  async (dispatch) => {
    try {
      const data = await request(dispatch, "/auth/password/reset", {
        mobile_no,
      });
      dispatch(setSuccessMessage(data.message));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  };

export const logoutUser = () => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("user"));
  if (data) await request(dispatch, "/auth/logout",null, data.data.token);
  dispatch(logout());
};

export const sendLoginLink =
  ({ mobile_no }) =>
  async (dispatch) => {
    try {
      const data = await request(dispatch, "/auth/login/send", { mobile_no });
      dispatch(setSuccessMessage(data.message));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(loginFailure());
    }
  };
const _loginSuccesHandler = (data, dispatch) => {
  localStorage.setItem("user", JSON.stringify(data));
  dispatch(loginSuccess(data));
  dispatch(setRequestOTP(false));
};
