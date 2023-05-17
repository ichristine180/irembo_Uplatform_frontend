import "./App.css";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./Signup";
import Profile from "./Profile";
import { useState } from "react";
const data = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  mobileNo: "0781234567",
  gender: "Male",
  dob: "1990-01-01",
  maritalStatus: "Married",
  profileImage:
    "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
};

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const switchForms = () => {
    setIsSignUp(!isSignup);
    setIsLogin(!isLogin);
  };
  return (
    <div className="main">
      {!isLoggedIn && (
        <>
          {isLogin && (
            <Login switchForms={switchForms} setIsLoggedIn={setIsLoggedIn} />
          )}
          {isSignup && <SignUp switchForms={switchForms} />}
        </>
      )}
      {isLoggedIn && (
        <>
          <Header />
          <Profile data={data} />
        </>
      )}
    </div>
  );
}

export default App;
