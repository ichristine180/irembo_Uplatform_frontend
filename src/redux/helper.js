const BASE_URL = process.env.C;

const handleResponse = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("API request failed");
  }
};

export const request = async (endpoint, body, token) => {
  try {
    const requestOptions = {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) requestOptions.headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error("API request failed");
  }
};
