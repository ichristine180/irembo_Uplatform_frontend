import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginWithLink } from "../redux/authThunks";

const LoginLink = () => {
  const { token } = useParams("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateTo = useSelector((state) => state.auth.navigate);
  console.log(navigateTo);
  useEffect(() => {
    dispatch(loginWithLink(token));
  }, [token,dispatch]);
  useEffect(() => {
    if (navigateTo) navigate("/");
  }, [navigate, navigateTo]);
  return <div></div>;
};

export default LoginLink;
