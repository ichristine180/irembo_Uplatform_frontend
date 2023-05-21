import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <nav class="nav-header">
      <a href="/" className="navbar-brand px-5">
        User Account management
      </a>
      <FontAwesomeIcon
        onClick={() => dispatch(logoutUser())}
        icon={faSignOutAlt}
        style={{ cursor: "pointer" }}
        className="icon-logout"
      />
    </nav>
  );
};

export default Header;
