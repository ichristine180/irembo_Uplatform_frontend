import Form from "./Form";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../redux/authThunks";
import Alert from "./shared/Alert";
import { useEffect } from "react";
import { clear } from "../redux/authSlice";

const VerificationCode = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);
  return (
    <section className="sign-in">
      <div className="container">
        <Alert />
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src="/images/code.png" alt="sing" />
            </figure>
          </div>

          <div className="signin-form">
            <h2>OTP Verification</h2>
            <br></br>
            <br></br>
            <Form
              fields={[
                {
                  name: "code",
                  label: "Code",
                  type: "text",
                  icon: "zmdi zmdi-lock-outline",
                  required: true,
                  validate: null,
                  validateMessage: null,
                  placeholder: "Enter code",
                },
              ]}
              btnName={"Send"}
              onSubmit={(data) => {
                dispatch(verifyOTP(data));
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationCode;
