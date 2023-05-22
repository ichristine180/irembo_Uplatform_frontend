import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../redux/authSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);
  let body = "";
  if (successMessage || errorMessage)
    body = (
      <div
        className={`alert ${
          errorMessage ? "alert-warning" : "alert-success"
        } alert-dismissible fade show mx-2`}
        role="alert"
        id="alert"
      >
        {errorMessage && !successMessage ? errorMessage : successMessage}
        <FontAwesomeIcon
          icon={faTimes}
          style={{ cursor: "pointer", float: "right" }}
          onClick={() => {
            document.getElementById("alert").style.display = "none";
            dispatch(clear());
          }}
        />
      </div>
    );
  return <>{body}</>;
};

export default Alert;
