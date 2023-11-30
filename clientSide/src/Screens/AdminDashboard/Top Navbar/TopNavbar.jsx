import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../../../assets/images/blogbar.jpg";
import logout from "../../../assets/images/logout.png";
import "./navbar.css";
import Logout from "./Logout";

const TopNavbar = ({ onSearch, activeTab }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const User1 = user?.user[0]?.firstName;
  const User2 = user?.user[0]?.lastName;
  const name = User1 + " " + User2;

  const [ModalOpen, setModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  function openScreen() {
    setModalOpen(!ModalOpen);
  }

  const handleSearch = (query) => {
    onSearch(query, activeTab);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchItem(query);
    handleSearch(query);
  };

  return (
    <>
      <div className="mb-4 rana">
        <div className="container-fluid ps-4">
          <div className="row align-items-center">
            <div className="col-md-8 col-sm-12">
              <div className="mb-3 d-flex search-input-container align-items-center">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search-icon px-2 fs-5"
                />
                <input
                  type="text"
                  value={searchItem}
                  onChange={handleInputChange}
                  className="form-control px-5 rounded p-2 bg-light me-3"
                  id="exampleFormControlInput1"
                  placeholder="Search Music , Art"
                  style={{ fontWeight: "500" }}
                />
              </div>
            </div>
            <div className="col-md-2 col-sm-6 text-end pe-0 ps-sm-5">
              <div className="d-flex">
                <div>
                  <img
                    src={img1}
                    alt=""
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  style={{ lineHeight: "normal" }}
                  type="button"
                  className="ps-2"
                >
                  <p
                    className="m-0"
                    style={{ color: "#4C4C4C", fontWeight: "500" }}
                  >
                    {name}
                  </p>
                  <p className="text-start" style={{ color: "#B3B3B3" }}>
                    Admin
                  </p>
                </div>
              </div>
            </div>
           
            <div
              className="col-md-auto ms-3 col-sm-6 m-0 text-start p-0"
              type="button"
              onClick={openScreen}
            >
              <img
                src={logout}
                alt="data"
                className="fs-3 pb-4"
                style={{ width: "30px" }}
              />
             
            </div>
          </div>
        </div>
        <hr
          className="w-100 mb-3"
          style={{ borderBottom: "1px solid grey", opacity: "0.1" }}
        />
      </div>

      <Logout closeModal={openScreen} ModalIsOpen={ModalOpen} />
    </>
  );
};

export default TopNavbar;
