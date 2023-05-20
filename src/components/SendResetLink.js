import Form from "./Form";
import { useDispatch } from "react-redux";
import Alert from "./shared/Alert";
import { sendResetLink } from "../redux/authThunks";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sendresetlink = () => {
  const dispatch = useDispatch();
  const [showResendLink, setShowResendLink] = useState(false);
  const [data, setData] = useState(null);
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
            <h2>Send reset password link</h2>
            <br></br>
            <br></br>
            <Form
              fields={[
                {
                  name: "mobile_no",
                  label: "phonenumber",
                  type: "text",
                  icon: "zmdi zmdi-lock-outline",
                  required: true,
                  validate: null,
                  validateMessage: null,
                  placeholder: "Enter phone number",
                },
              ]}
              btnName={"Send"}
              onSubmit={(data) => {
                dispatch(sendResetLink(data));
                setData(data);
                setShowResendLink(true);
              }}
            />
            <br />
            {showResendLink && data ? (
              <p>
                Didn't receive link?{" "}
                <Link
                  to="#"
                  onClick={() => {
                    dispatch(sendResetLink(data));
                  }}
                >
                  Resend
                </Link>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sendresetlink;
