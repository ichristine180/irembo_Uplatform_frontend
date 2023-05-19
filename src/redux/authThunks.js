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
    if (!data.success) dispatch(loginFailure());
    _loginSuccesHandler(data, dispatch);
  } catch (error) {
    dispatch(setErrorMessage({ message: error.message, navigate: true }));
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
      dispatch(loginFailure());
    }
  };

export const logoutUser = () => async (dispatch) => {
  const { data } = JSON.parse(localStorage.getItem("user"));
  await request(dispatch, "/auth/logout", null, data.token);
  window.location.reload();
  dispatch(logout());
};

export const sendLoginLink =
  ({ mobile_no }) =>
  async (dispatch) => {
    try {
      const data = await request(dispatch, "/auth/login/send", { mobile_no });
      dispatch(setSuccessMessage(data));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(loginFailure());
    }
  };
const _loginSuccesHandler = (data, dispatch) => {
  console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
  dispatch(loginSuccess(data));
  dispatch(setRequestOTP(false));
};
