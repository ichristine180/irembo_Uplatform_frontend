import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/userThunk";

import Form from "../shared/Form";
import Alert from "../shared/Alert";
import { useState } from "react";

const Signup = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  return (
    <section className="main signup">
      <div className="container">
        <Alert />
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            {
              <Form
                btnName="SignUp"
                fields={fields}
                onSubmit={(data) => {
                  dispatch(signup(data, navigate, image));
                }}
                child={<Image setImage={setImage} image={image} />}
              />
            }
          </div>
          <div className="signup-image">
            <figure>
              <img src="/images/signup.jpg" alt="signup" />
            </figure>
            <span
              className="signup-image-link"
              onClick={() => navigate("/login")}
            >
              Aleady have account? Login
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const fields = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    icon: "zmdi zmdi-account",
    required: true,
    placeholder: "Enter your first name",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    icon: "zmdi zmdi-account",
    required: true,
    placeholder: "Enter your last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    icon: "zmdi zmdi-email",
    required: true,
    validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    validateMessage: "Invalid email format",
    placeholder: "Enter your email address",
  },
  {
    name: "mobile_no",
    label: "Mobile NO",
    type: "text",
    icon: "zmdi zmdi-phone",
    required: true,
    validate: /^(07[2839]|\+2507[28])(\d{7})$/,
    validateMessage: "Invalid mobile format",
    placeholder: "07xxxxxxxx",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    icon: "zmdi zmdi-male-female",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "date_of_birth",
    label: "Date of Birth",
    type: "date",
    icon: "zmdi zmdi-calendar",
    required: true,
    placeholder: "Select your date of birth",
  },
  {
    name: "nationailty",
    label: "Nationality",
    type: "text",
    icon: "zmdi zmdi-global",
    required: true,
    placeholder: "Enter your nationality",
  },
  {
    name: "marital_status",
    label: "Marital Status",
    type: "select",
    icon: "zmdi zmdi-accounts-list-alt",
    required: true,
    options: [
      { label: "Single", value: "single" },
      { label: "Married", value: "married" },
      { label: "Divorced", value: "divorced" },
      { label: "Widowed", value: "widowed" },
    ],
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    icon: "zmdi zmdi-lock-outline",
    placeholder: "Enter password",
    required: true,
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    validateMessage:
      "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)",
  },
];

const Image = ({ setImage, image }) => {
  return (
    <>
      <b> {image.name}</b>
      <div className="file-upload">
        <label htmlFor="fileInput">
          <span>Upload Profile Picture</span>
          <input
            id="fileInput"
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept=".jpg, .jpeg, .png"
          />
        </label>
      </div>
    </>
  );
};
export default Signup;
