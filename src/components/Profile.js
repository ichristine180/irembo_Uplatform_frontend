import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./profile.css";
import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
const Profile = () => {
  return (
    <div className="container mt-5">
      <Header />
      <section>
        <div className="rt-container">
          <div className="col-rt-12">
            <div className="Scriptcontent">
              <div className="user-profile py-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent text-center">
                          <img
                            className="profile_img"
                            src="https://res.cloudinary.com/detyymnbz/image/upload/v1684482818/uploads/q7x1xg4eigvi7thvehnu.jpg"
                            alt="user dp"
                          />
                          <h3>
                            Ingabire Christine{" "}
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              color="blue"
                            />
                          </h3>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">
                            <strong className="pr-1">Mobile No</strong>{" "}
                            321000001
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0">
                            <i className="far fa-clone pr-1"></i>Profile
                            Information
                          </h3>
                        </div>
                        <div className="card-body pt-0">
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <th width="30%">Roll</th>
                                <td width="2%">:</td>
                                <td>125</td>
                              </tr>
                              <tr>
                                <th width="30%">Academic Year</th>
                                <td width="2%">:</td>
                                <td>2020</td>
                              </tr>
                              <tr>
                                <th width="30%">Gender</th>
                                <td width="2%">:</td>
                                <td>Male</td>
                              </tr>
                              <tr>
                                <th width="30%">Religion</th>
                                <td width="2%">:</td>
                                <td>Group</td>
                              </tr>
                              <tr>
                                <th width="30%">blood</th>
                                <td width="2%">:</td>
                                <td>B+</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div style={{ height: "26px" }}></div>
                      <div className="card shadow-sm">
                        <div className="card-header bg-transparent border-0">
                          <h3 className="mb-0">
                            <i className="far fa-clone pr-1"></i>Identification
                            Information
                          </h3>
                        </div>
                        <div className="card-body pt-0">
                          <p>
                            Identification Type <b>NID</b>
                          </p>
                          <p>
                            Identification NUmber{" "}
                            <b>111111111111111111111111111</b>
                          </p>
                          <img
                            src="https://res.cloudinary.com/detyymnbz/image/upload/v1684482818/uploads/q7x1xg4eigvi7thvehnu.jpg"
                            alt="user dp"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
