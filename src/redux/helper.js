import { setIsLoading, setErrorMessage } from "./authSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const handleResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    if (!data.isSuccessfull) throw new Error(data.message);
    return data;
  } else throw new Error(data.message);
};

export const request = async (dispatch, endpoint, body, token) => {
  try {
    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) requestOptions.body = JSON.stringify(body);
    if (token) requestOptions.headers["authtoken"] = `Bearer ${token}`;
    dispatch(setIsLoading(true));
    const response = await fetch(`${BASE_URL}api${endpoint}`, requestOptions);
    if (response.status === 429)
      throw new Error("Too many request! try again later");
    dispatch(setIsLoading(false));
    return handleResponse(response);
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setErrorMessage(error.message));
  }
};

export const saveImage = async (imageFile, dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile, imageFile.name);
    dispatch(setIsLoading(true));
    const response = await fetch(`${BASE_URL}api/user/upload`, {
      method: "POST",
      body: formData,
    });
    dispatch(setIsLoading(false));
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    const imageUrl = data.data.imageUrl;
    return imageUrl;
  } catch (error) {
    throw new Error("Error occurred during image upload");
  }
};
