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

export const getuserdata = () => async (dispatch) => {
  try {
    const { id, token } = JSON.parse(localStorage.getItem("user")).data;
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

export const accountVerification = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const imageUrl = await saveImage(data.docImage, dispatch);
    const resdata = await request(
      dispatch,
      "/user/verification",
      {
        user_account_id: user.data.id,
        identification_number: data.docIDNumber,
        identification_type: data.docType,
        identity_image: imageUrl,
      },
      user.data.token
    );
    if (!resdata.isSuccessfull) throw new Error(resdata.message);
    else  dispatch(getuserdata());
  } catch (error) {
    dispatch(setErrorMessage(error.message));
  }
};
