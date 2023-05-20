import { toast } from "react-toastify";
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

export const signup = (data, navigate) => async (dispatch) => {
  try {
    const userdata = {
      accountData: {
        mobile_no: data.mobile_no,
        password: data.password,
        role: 0,
      },
      profileData: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        dob: data.date_of_birth,
        gender: data.gender,
        marital_status: data.marital_status,
        nationality: data.nationailty,
        profile_photo:
          "https://static.actu.fr/uploads/2023/05/neige-pyr-n-es-orientales-960x640.jpg",
      },
    };
    const resdata = await request(dispatch, "/user/signup", data);
    if (!resdata.success) {
      toast.error("An error occured, please try again");
    } else {
      if (navigate) {
        navigate("/");
      }
    }
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
  const { data } =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  await request(dispatch, "/auth/logout", null, data && data.token);
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
