import { loginSuccess, loginFailure, setRequestOTP, logout } from "./authSlice";
import { request } from "./helper";

export const login = ({mobile_no, password}) => async (dispatch) => {
  try {
    await request("/auth/login", { mobile_no, password });
    dispatch(setRequestOTP(true));
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const verifyOTP = (code) => async (dispatch) => {
  try {
    const data = await request("/auth/verify", { code });
    localStorage.setItem("user", data);
    dispatch(loginSuccess(data));
    dispatch(setRequestOTP(false));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logoutUser = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "+++++++++++++++++");
  await request("/auth/logout", null, user.token);
  dispatch(logout());
};
