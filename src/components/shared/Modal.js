import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { accountVerification } from "../../redux/userThunk";

const VerificationModal = ({ showModal, toggleModal }) => {
  const dispatch = useDispatch();
  const [docType, setDocType] = useState("");
  const [docIDNumber, setDocIDNumber] = useState("");
  const [docImage, setDocImage] = useState(null);
  const handleDocTypeChange = (event) => {
    setDocType(event.target.value);
  };
  const handleDocIDNumberChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "");
    setDocIDNumber(digitsOnly);
    setDocIDNumber(digitsOnly);
  };

  const handleDocImageChange = (event) => {
    setDocImage(event.target.files[0]);
  };
  const submitHandler = () => {
    if (!docType || !docIDNumber || !docImage) return;
    dispatch(accountVerification({ docType, docImage, docIDNumber }));
    toggleModal();
  };
  return (
    <div>
      <Modal show={showModal} onHide={toggleModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Request Account Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <select
              className="form-control"
              id="docType"
              value={docType}
              onChange={handleDocTypeChange}
            >
              <option value="Passport">Passport</option>
              <option value="NID">NID</option>
            </select>
          </div>
          <div className="form-group">
            <input
              value={docIDNumber}
              type="text"
              className="form-control"
              id="docIDNumber"
              placeholder={
                docType === "NID" ? "Enter ID Number" : "Enter Passport Number"
              }
              onChange={handleDocIDNumberChange}
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              id="docImage"
              onChange={handleDocImageChange}
              accept=".jpeg, .jpg, .png"
            />
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={toggleModal}
              style={{ float: "left" }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={submitHandler}
              style={{ float: "right" }}
            >
              Send
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VerificationModal;
