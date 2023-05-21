import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "../assets/styles/App.css";
import Login from "./Login";
import { userRoutes } from "../routes/user";
import Signup from "./Signup";
import VerificationCode from "./Verification";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import LoginLink from "./LoginLink";
import Sendresetlink from "./SendResetLink";
import Profile from "./Profile";

function App() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      {isLoading && (
        <div className="spinner-overlay">
          <div className="spinner-border" role="status"></div>
        </div>
      )}{" "}
      <Router>{isAuthenticated ? <Protected /> : <Public />}</Router>
    </div>
  );
}
const Public = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Login {...props} />} />
      {/* <Route path="/" element={<Profile {...props} />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/verificationCode"
        element={<VerificationCode {...props} />}
      />
      <Route path="/sendresetlink" element={<Sendresetlink {...props} />} />
      <Route path="/login/link/:token" element={<LoginLink />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Protected = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  const body = getBody(user);
  return <Routes>{body}</Routes>;
};

const getBody = () =>
  userRoutes.map((item, i) => {
    return <Route path={item.path} element={item.element} key={i} />;
  });

export default App;
