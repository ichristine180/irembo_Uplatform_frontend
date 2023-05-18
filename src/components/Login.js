import { useState } from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [loginWithLink, setLoginWithLink] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="sign-in">
      <div className="container">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="/images/login.jpg" alt="sing" />
            </figure>
            <span
              className="signup-image-link"
              onClick={() => navigate("signup")}
            >
              Don't have an account? Sign Up
            </span>
          </div>

          <div className="signin-form">
            <h2 className="form-title"> Login</h2>
            <LoginForm {...props} loginWithLink={loginWithLink} />
            <div className="social-login">
              <span
                className="social-label"
                onClick={() => setLoginWithLink(!loginWithLink)}
              >
                {loginWithLink ? "Use password" : "Use Personal Access Token"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LoginForm = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {!props.loginWithLink && (
        <Form
          btnName="Login"
          fields={fields}
          onSubmit={(data) => navigate("verificationCode")}
        />
      )}
      {props.loginWithLink && (
        <Form
          btnName="Send link"
          fields={[
            {
              name: "mobile_no",
              label: "Mobile NO",
              type: "text",
              icon: "zmdi zmdi-phone",
              required: true,
              validate: /^(07[283]|\+2507[28])(\d{7})$/,
              validateMessage: "Invalid mobile format",
              placeholder: "07xxxxxxxx",
            },
          ]}
          onSubmit={(data) => {
            props.setIsLoggedIn(true);
            console.log(data);
          }}
        />
      )}
    </>
  );
};
const fields = [
  {
    name: "mobile_no",
    label: "Mobile NO",
    type: "text",
    icon: "zmdi zmdi-phone",
    required: true,
    validate: /^(07[283]|\+2507[28])(\d{7})$/,
    validateMessage: "Invalid mobile format",
    placeholder: "07xxxxxxxx",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: "zmdi zmdi-lock-outline",
    placeholder: "Enter password",
    required: true,
    validate: null,
    validateMessage: null,
  },
];
export default Login;
