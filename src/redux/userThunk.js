import { loginFailure, setErrorMessage, setUSerData } from "./authSlice";
import { request } from "./helper";

export const signUp = (data) => async (dispatch) => {
  try {
    await request(dispatch, "/auth/signup", data);
  } catch (error) {
    console.log(error);
    dispatch(setErrorMessage(error.message));
    dispatch(loginFailure());
  }
};

export const getuserdata =({authtoken, id}) =>
  async (dispatch) => {
    try {
      const userResponse=await request(dispatch, "/user/info", { id }, authtoken);
      console.log(userResponse)
      dispatch(setUSerData(userResponse))
    } catch (error) {
      console.log("Errorr====",error)
      dispatch(setErrorMessage(error.message));
    }
  };

