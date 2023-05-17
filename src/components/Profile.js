import "./profile.css";
const Profile = (props) => {
  const {
    firstName,
    lastName,
    email,
    mobileNo,
    gender,
    dob,
    maritalStatus,
    profileImage,
  } = props.data;
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>
          {firstName} {lastName}
        </h2>
        <div className="profile-field">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="profile-field">
          <label>Mobile No:</label>
          <span>{mobileNo}</span>
        </div>
        <div className="profile-field">
          <label>Gender:</label>
          <span>{gender}</span>
        </div>
        <div className="profile-field">
          <label>Date of Birth:</label>
          <span>{dob}</span>
        </div>
        <div className="profile-field">
          <label>Marital Status:</label>
          <span>{maritalStatus}</span>
        </div>
      </div>
    </div>
  );
};
export default Profile;
