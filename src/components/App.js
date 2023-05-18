import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import { userRoutes } from "../routes/user";
import { admiRoutes } from "../routes/admin";
import Signup from "./Signup";
import VerificationCode from "./Verification";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="main">{isAuthenticated ? <Protected /> : <Public />}</div>
  );
}
const Public = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login {...props} />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="verificationCode"
          element={<VerificationCode {...props} />}
        />
      </Routes>
    </Router>
  );
};

const Protected = () => {
  const user = { role: 0, token: "asss" };
  const body = getBody(user);
  return (
    <Router>
      <Routes>{body}</Routes>
    </Router>
  );
};

const getBody = (user) => {
  if (user && user.role > 0)
    return admiRoutes.map((item, i) => {
      return <Route path={item.path} element={item.element} key={i} />;
    });
  else
    return userRoutes.map((item, i) => {
      return <Route path={item.path} element={item.element} key={i} />;
    });
};

export default App;
