import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/profile.css";
import React, { useEffect } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import profileImg from "../assets/images/profile-img.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { getuserdata } from "../redux/userThunk";
const Profile = () => {
  const dispatch = useDispatch();
  // const user=JSON.parse(localStorage.getItem('user'))
  // const {authtoken, id}=user.data;

  useEffect(() => {
    dispatch(
      getuserdata({ authtoken: "", id: "28b2db13-1e54-4cea-91da-78dee73a6370" })
    );
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user?.data);
  //console.log(user?.account);
  const date=dateFormat(user?.profile.dob,'mmmm d, yyyy')
  const age=new Date().getFullYear()-Number(dateFormat(user?.profile.dob,'yyyy'))
  console.log(age)
  return (
    <div className="">
      <Header />
      {user ? (
        <section className="pr-content-section">
          <div className="img-profile-container">
            <img src={profileImg} />
          </div>
          <div className="profile-info-container">
            <div className="profile-upper">
              <img
                className="profile_img"
                src={user?.profile.profile_photo}
                alt="user dp"
              />
              <div>
                <h2>
                  {`${user.profile.first_name} ${user.profile.last_name}`}
                  {user?.account.status === "VERIFIED" ? (
                    <FontAwesomeIcon icon={faCheckCircle} color="blue" />
                  ) : (
                    ""
                  )}
                </h2>
                <p className="pemail">{user.profile.email}</p>
              </div>
            </div>
            <hr />
            <div className="profile-basic-information">
              <h2 className="text-title-profile">Personal user Information</h2>
              <br />
              <div className="profile-details-container">
                <div>
                  <p className="">Mobile number: {user.profile.last_name}</p>
                  <br />
                  <p className="">Gender: {user.profile.gender}</p>
                  <br />
                  <p className="">Age: {age}</p>
                  <br />
                  <p className="">Mobile number: {user.account.mobile_no}</p>
                  <br />
                </div>
                <div className="separator-verical" />
                <div>
                  <p className="">Birth of date: {date}</p>
                  <br />
                  <p className="">
                    Marital status: {user.profile.marital_status}
                  </p>
                  <br />
                  <p className="">Nationality: {user.profile.nationality}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="profile-basic-information">
              <h2 className="text-title-profile">
                User identification Information
              </h2>
              <br />
              <div className="id-profile-container">
                {user?.account.status === "VERIFIED" ? (
                  <div className="id-image-profile-container"><img src={user.profile.identity_image}/></div>
                ) : (
                  <Link className="form-submit" to="/verifyaccount">
                    Verify your account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Please wait</p>
      )}
    </div>
  );
};

export default Profile;
