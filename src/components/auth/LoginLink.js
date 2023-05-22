import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginWithLink } from "../../redux/authThunks";

const LoginLink = () => {
  const { token } = useParams("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  useEffect(() => {
    dispatch(loginWithLink(token));
  }, [token, dispatch]);
  useEffect(() => {
    if (errorMessage) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, errorMessage]);
  return <div></div>;
};

export default LoginLink;
