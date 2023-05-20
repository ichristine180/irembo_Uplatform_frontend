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
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) requestOptions.headers.Authorization = `Bearer ${token}`;
    dispatch(setIsLoading(true));
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    if (response.status == 429)
      throw new Error("Too many request! try again later");
    dispatch(setIsLoading(false));
    return handleResponse(response);
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setErrorMessage(error.message));
  }
};

export const uploadImage = async (dispatch, endpoint, file, token) => {
  try {
    const requestOptions = {
      method: "post",
      file: file,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) requestOptions.headers.Authorization = `Bearer ${token}`;
    dispatch(setIsLoading(true));
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    dispatch(setIsLoading(false));
    return handleResponse(response);
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setErrorMessage("API request failed"));
  }
};
