import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/profile.css";
import React, { useEffect } from "react";
import { faBell, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { getuserdata } from "../redux/userThunk";
const notification = [
  "Please Protect Your Passwords,Keep your passwords confidential and avoid sharing them with anyone. Create strong, unique passwords for each online account):",
];
const Profile = () => {
  const dispatch = useDispatch();
  const { id, token } = JSON.parse(localStorage.getItem("user")).data;
  useEffect(() => {
    dispatch(getuserdata({ token, id }));
  }, [dispatch, id, token]);
  const data = useSelector((state) => state.auth.userData);
  let info = data && data.data;
  return (
    <div className="">
      <Header />
      {info && (
        <section className="pr-content-section">
          <div className="img-profile-container">
            {notification.map((key, i) => {
              return (
                <div className="notifications" key={i}>
                  <div className="notification">
                    <FontAwesomeIcon icon={faBell} />

                 <span>   Hi {info.profile.first_name} {key}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="profile-info-container">
            <div className="profile-upper">
              <img
                className="profile_img"
                src={info.profile.profile_photo}
                alt="user dp"
              />
              <div>
                <h2>
                  {`${info.profile.first_name} ${info.profile.last_name}`}
                  {info.account.status === "VERIFIED" && (
                    <FontAwesomeIcon icon={faCheckCircle} color="blue" />
                  )}
                </h2>
                <p className="pemail">{info.profile.email}</p>
              </div>
            </div>
            <hr />
            <PersonalInformation
              profile={info.profile}
              account={info.account}
            />
            {info.vRequest ? (
              <IdentificationInfo profile={info.profile} />
            ) : (
              <Link className="form-submit" to="/verifaccount">
                Verify account
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
const PersonalInformation = ({ profile, account }) => {
  const date = dateFormat(profile.dob, "mmmm d, yyyy");
  return (
    <>
      {" "}
      <div className="profile-basic-information">
        <h2 className="text-title-profile">Personal user Information</h2>
        <br />
        <div className="profile-details-container">
          <div>
            <p className="">Gender: {profile.gender}</p>
            <br />
            <p className="">Age: {calculateAge(profile.dob)}</p>
            <br />
            <p className="">Mobile number: {account.mobile_no}</p>
            <br />
          </div>
          <div className="separator-verical" />
          <div>
            <p className="">Birth of date: {date}</p>
            <br />
            <p className="">Marital status: {profile.marital_status}</p>
            <br />
            <p className="">Nationality: {profile.nationality}</p>
          </div>
        </div>
      </div>
    </>
  );
};
const IdentificationInfo = ({ profile }) => {
  return (
    <>
      <hr />
      <div className="profile-basic-information">
        <h2 className="text-title-profile">User identification Information</h2>
        <br />
        <div className="id-profile-container">
          <div className="id-image-profile-container">
            <img src={profile.identity_image} alt="id" />
          </div>
        </div>
      </div>
    </>
  );
};

const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

export default Profile;
