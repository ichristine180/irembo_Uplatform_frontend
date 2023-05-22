import { setErrorMessage, setSuccessMessage, setUSerData } from "./authSlice";
import { request, saveImage } from "./helper";

export const signup = (data, navigate, imageFile) => async (dispatch) => {
  try {
    const imageUrl = await saveImage(imageFile, dispatch);
    const userdata = getData(data, imageUrl);

    const resdata = await request(dispatch, "/user/signup", userdata);
    if (!resdata.isSuccessfull) throw new Error(resdata.message);
    else {
      navigate("/");
      setSuccessMessage("Your account has been created successfull!");
    }
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};

export const getuserdata =
  ({ token, id }) =>
  async (dispatch) => {
    try {
      const userResponse = await request(dispatch, "/user/info", { id }, token);
      dispatch(setUSerData(userResponse));
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  };
const getData = (data, imageUrl) => {
  return {
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
      profile_photo: imageUrl,
    },
  };
};
