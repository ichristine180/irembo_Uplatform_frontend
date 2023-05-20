export const signUp = (data) => async (dispatch) => {
  try {
    await request(dispatch, "/auth/signup", data);
  } catch (error) {
    console.log(error);
    dispatch(setErrorMessage(error.message));
    dispatch(loginFailure());
  }
};
