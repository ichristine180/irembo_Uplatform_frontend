import { setIsLoading } from "./authSlice";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("API request failed");
  }
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
    dispatch(setIsLoading(false));
    return handleResponse(response);
  } catch (error) {
    dispatch(setIsLoading(false));
    throw new Error("API request failed");
  }
};
