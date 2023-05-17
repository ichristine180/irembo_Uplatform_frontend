import { useState } from "react";
import Form from "./Form";

const Login = (props) => {
  const [loginWithLink, setLoginWithLink] = useState(false);
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
              onClick={() => props.switchForms()}
            >
              New Here? SignUp
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
                {loginWithLink
                  ? "Login with password"
                  : "Or use Login support Link"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LoginForm = (props) => {
  return (
    <>
      {!props.loginWithLink && (
        <Form
          btnName="Login"
          fields={fields}
          onSubmit={(data) => {
            props.setIsLoggedIn(true);
            console.log(data);
          }}
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
