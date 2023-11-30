import React, { useState } from "react";

import cover from "../assets/images/cover.png";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
// import { AccountDetail } from "../Screens/UserDashboard/AccountDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

// import PaymentSetting from "../Screens/UserDashboard/PaymentSetting";
// import AddPayment from "../Screens/UserDashboard/AddPayment";
import UploadArtWork from "./UploadArt/UploadArtWork";
// import Profile from "../Screens/UserDashboard/Profile/Profile";
// import UserProfile from '../Screens/AdminDashboard/Profile/Profile'
import Message from "../Screens/UserDashboard/Messaging/Message";
import { useLocation } from "react-router-dom";
import DonationScreen from "../Screens/UserDashboard/Donations/DonationScreen";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UpdatePassword from "../Screens/UserDashboard/UpdatePassword";
import PublicProfile from "../Screens/UserDashboard/PublicProfile/PublicProfile";

export default function LandingSideBar() {
  // const [buttonClicked, setButtonClicked] = useState(false);


  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation()
  function handleSidebarClick() {
    setSidebarVisible(!sidebarVisible);
  }

  

  // const screenShift = () => {
  //   setButtonClicked(!buttonClicked);
  // };
  const eventKey = location.state?.eventKey;
  const MessageToUser = location.state?.user_id


  return (
    <>
      <div
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",

          width: "100%",
          height: "170px",
        }}
      >
        {/* Content */}
      </div>

      <div>
        {/* <h2>User Dashboard</h2> */}
        <Tab.Container id="left-tabs-example" defaultActiveKey={`${ eventKey ? eventKey:'public'}`}>
          <Row className="m-0 mt-3 mb-3 " style={{ minHeight: "750px" }}>
            <Col
              sm={2}
              className={`sidebar-area shadow-end rounded-4 card  ${
                sidebarVisible ? "active" : ""
              }`}
              style={{
                paddingTop: "30px",
                position: "relative",
                boxShadow: "5px 5px 3px #dbc6c6",
                zIndex:1
              }}
            >
              <button
                type="button"
                onClick={handleSidebarClick}
                className="text-start sideBar-icon bg-transparent border-0 "
              >
                <FontAwesomeIcon icon={faList} />
              </button>

              <Nav variant="pills" className="flex-column">
                {/* side menu titles */}
                <div>
                  <p
                    className="text-middle openSans-300 mt-2  ms-3"
                    style={{ margin: "0.2rem", color: "#709CA6" }}
                  >
                    SETTING
                  </p>
                </div>
                  

                <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2 mt-2"
                    style={{ margin: "0.2rem" , background:'none'}}
                    eventKey="public"
                  >
                    <div className="d-flex align-items-center">
                      <div className="icon">
                        <AccountBoxOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center">    <p className="sidebarTitle title text-middle m-0 fw-bold openSans-400 p-0 ps-3 " style={{textTransform:'capitalize'}}>Public Profile</p>{" "}</div>
                    </div>
                
                  </Nav.Link>
                </Nav.Item> 

               
             

                <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2"
                    style={{ margin: "0.2rem" , background:'none' }}
                    eventKey="fourth"
                  >
                      <div className="d-flex align-items-center">
                      <div className="icon">
                        <AccountBalanceOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center"><p className="text-middle title m-0 sidebarTitle fw-bold openSans-400 p-0 ps-3" style={{textTransform:'capitalize'}}>
                     Reset Password
                    </p></div>
                    </div>
                    
                  </Nav.Link>
                </Nav.Item>

             
                <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2"
                    style={{ margin: "0.2rem" , background:'none' }}
                    eventKey="seventh"
                  >
                      <div className="d-flex align-items-center">
                      <div className="icon">
                        <VolunteerActivismOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center"> <p className="text-middle title m-0 sidebarTitle openSans-400 fw-bold p-0 ps-3" style={{textTransform:'capitalize'}}>
                     Payment Settings
                    </p></div>
                    </div>
                   
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2"
                    style={{ margin: "0.2rem" , background:'none'}}
                    eventKey="fifth"
                  >
                      <div className="d-flex align-items-center">
                      <div className="icon">
                        <FileUploadOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center"> <p className="text-middle title m-0 sidebarTitle openSans-400 p-0 ps-3 fw-bold" style={{textTransform:'capitalize'}}>
                      Your artwork
                    </p></div>
                    </div>
                   
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2"
                    style={{ margin: "0.2rem" , background:'none'}}
                    eventKey="sixth"
                  >
                      <div className="d-flex align-items-center">
                      <div className="icon">
                        <MessageOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center"> <p className="text-middle title m-0 sidebarTitle openSans-400 p-0 fw-bold ps-3" style={{textTransform:'capitalize'}}>
                     Messages
                    </p></div>
                    </div>
                   
                  </Nav.Link>
                </Nav.Item>
            {/* <Nav.Item className="">
                  <Nav.Link
                    className="fs-6 d-flex p-0 py-2 mt-2"
                    style={{ margin: "0.2rem" , background:'none'}}
                    eventKey="first"
                  >
                    <div className="d-flex align-items-center">
                      <div className="icon">
                        <AccountBoxOutlinedIcon/>
                      </div>
                      <div className="d-flex align-items-center">    <p className="sidebarTitle text-middle m-0 fw-bold openSans-400 p-0 ps-3 bg-none" style={{textTransform:'capitalize'}}>Profile</p>{" "}</div>
                    </div>
                
                  </Nav.Link>
                </Nav.Item>  */}

      
              </Nav>
            </Col>
            <Col
              sm={10}
              className="sidebar-screens card rounded-2"
              style={{
                backgroundColor: "#F8F8F8",
                paddingTop: "30px",
                boxShadow: "5px 5px 3px #dbc6c6",
             
              }}
            >
              <Tab.Content>
              <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="public"
                > <PublicProfile /> </Tab.Pane>

                {/* <Tab.Pane
                  style={{ color: "black" }}
                  eventKey="first"
                >
               

                  {buttonClicked ? (
                    <UserProfile onButtonClick={screenShift} />
                  ) : (
                    <Profile onButtonClick={screenShift} />
                  )}
                </Tab.Pane> */}
                {/* <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="second"
                ></Tab.Pane> */}

            
                <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="fourth"
                >
                <UpdatePassword />
                  {/* {buttonClicked ? (
                    <AddPayment onButtonClick={screenShift} />
                  ) : (
                    <PaymentSetting onButtonClick={screenShift} />
                  )} */}
                </Tab.Pane>

                <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="fifth"
                >
                  <UploadArtWork />
                </Tab.Pane>

                <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="sixth"
                >
                 <Message userId={MessageToUser}/>
                </Tab.Pane>

                
                <Tab.Pane
                  style={{ color: "black", border: "none" }}
                  eventKey="seventh"
                >
                 <DonationScreen/>
                </Tab.Pane>

            

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
