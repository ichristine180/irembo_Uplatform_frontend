import { useNavigate } from "react-router-dom";
import Form from "./Form";

const VerificationCode = (props) => {
  const navigate = useNavigate();
  return (
    <section className="sign-in">
      <div className="container">
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
                props.setIsLoggedIn(true);
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationCode;
