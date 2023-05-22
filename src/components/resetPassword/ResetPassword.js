import { useNavigate, useParams } from "react-router-dom";
import Form from "../shared/Form";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/authThunks";
import Alert from "../shared/Alert";

const ResetPassword = () => {
  const { token } = useParams("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <section className="main sign-in">
      <div className="container">
        <Alert />
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="/images/login.jpg" alt="sing" />
            </figure>
          </div>

          <div className="signin-form">
            <h2>Send reset password link</h2>
            <br></br>
            <br></br>
            <Form
              btnName="Change Password"
              fields={[
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  icon: "zmdi zmdi-lock-outline",
                  placeholder: "Enter password",
                  required: true,
                  validate:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                  validateMessage:
                    "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)",
                },
              ]}
              onSubmit={({ password }) => {
                dispatch(resetPassword({ password, token }, navigate));
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
