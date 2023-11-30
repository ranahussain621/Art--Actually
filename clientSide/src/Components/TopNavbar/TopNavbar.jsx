import React, { useEffect, useState } from "react";
import "./topnav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Login from "../../Screens/Login";
import UserFlow from "./UserFlow";
import UPloadArtAndMusic from "../Modal/UPloadArtAndMusic";
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { useDispatch } from "react-redux";
import { CheckUserSubStatus } from "../../redux/features/auth/PaymentSlice";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import UserUploadArtFile from "../../Screens/UserDashboard/UserUploadArt/UserUploadArtFile";
import abc from '../../assets/abc.PNG'
import NewLogin from "../../Screens/newloginflow/NewLogin";
import ModalHandler from "../../Screens/newloginflow/ModalHandler";

const TopNavbar = () => {


  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  };



  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadArtMusicModalOpen, setUploadArtMusicModalOpen] = useState(false);
  const [mobilemenuClose, setmobilemenuClose] = useState(false)
  const [newLoginModal, setnewLoginModal] = useState(false)
  const [showSearch, setshowSearch] = useState(false)

  const [screenshift, setscreenshift] = useState(1)
  const User = JSON.parse(localStorage.getItem('user'))
  const subscriptio_id = User?.user[0]?.sub_id
  const subscription = User?.user[0]?.subscribe
  const vip = User?.user[0]?.vip
  const payment = User?.user[0]?.payment
  const navigate = useNavigate()

const dispatch = useDispatch()
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    setIsLoggedIn(!!userLoggedIn); 
  }, [setIsLoggedIn]);

  const loggedin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleMobileMenu = () => {
    setmobilemenuClose(!mobilemenuClose);
  };
  const handleShow = () => {
    setIsOpen(true);
  };
  function loginModalScreen() {
    setscreenshift(1)
    setnewLoginModal(!newLoginModal)
  }

  function showSearchBar() {
    setshowSearch(!showSearch)
  }
  const uploadModalScreen = async () => {
    if (subscriptio_id) {
      try {
      
        const res = await dispatch(CheckUserSubStatus(subscriptio_id));
        if (res.payload.status === 'canceled') {
          toast.error("Your subscription has been canceled");
          localStorage.clear();
          navigate('/');
        } else if (res.payload.status === 'No active subscription') {
          toast.warn("Please complete your subscription", { autoClose: 1000 });
          setUploadArtMusicModalOpen(!uploadArtMusicModalOpen);
        } 
      } catch (error) {
        console.error("Error checking user subscription status:", error);
      }
    }else {
          setUploadArtMusicModalOpen(!uploadArtMusicModalOpen);
        }
  };
  

  // const uploadModalScreen = () => {
  //   setUploadArtMusicModalOpen(!uploadArtMusicModalOpen)
  // }

  // const closeMobileMenu = (e) => {
  //   e.preventDefault(); // Prevent the default link behavior

  //   setmobilemenuClose(false);
  //   naviagte('/blog')
  // };

  useEffect(() => {
    const handleScroll = () => {
      const topNav = document.querySelector(".top-nav");
      if (topNav) {
        if (window.scrollY > 0) {
          topNav.classList.add("scrolled");
        } else {
          topNav.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [isScreenLessThan992, setIsScreenLessThan992] = useState(window.innerWidth < 992);

  // Create a function to update the state based on screen width
  const updateScreenSize = () => {
    setIsScreenLessThan992(window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);




  function shiftCountplus() {
       
    setscreenshift(screenshift+1)
   
  }
  function shiftCountminus() {
   
    setscreenshift(screenshift-1)
   
  }
  function restscreenplus(){
    setscreenshift(screenshift+2)
  }
  function restscreenminus(){
    setscreenshift(screenshift-2)
  }
  function interestscreenplus(){
    setscreenshift(screenshift+2)
  }
  function interestscreenminus(){
    setscreenshift(screenshift-2)
  }


  return (
    <>
      <div className="top-nav m-0 p-0 sticky-navbar ">
        <div className="bgImg ms-3 me-3">
          <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="container-fluid">
              <div className="col-12">
                <div
                  className={`row collapse navbar-collapse ${isOpen ? "show" : ""
                    }`}
                  id="navbarNav"
                >
                  <ul className="navbar-nav">
                    <div className="col ps-5">
                      <li className="nav-item">
                        <Link
                          className="nav-link m-0 active"
                          aria-current="page"
                          to="/"
                          style={{ color: "white" }}
                          onClick={handleLogoClick} 
                        // onClick={closeMobileMenu} // Close menu when clicked
                        >
                          <img
                            className="img-fluid logo-img"
                            src={logo}
                            alt=""
                            style={{ paddingBottom: "3px" }}
                          />
                        </Link>{" "}
                      </li>
                    </div>

                    <div className={`col d-flex align-items-center justify-content-center text-md-center ${isScreenLessThan992 ? '' : 'home-adjust'}`}>
              <li className="nav-item">
         <Link
      className="nav-link m-0 impression"
      to="/"
      style={{ color: "white", fontWeight: "500" }}
    >
      Home
    </Link>
        </li>
         </div>


                    <div className="col d-flex align-items-center justify-content-center text-md-center">
                      <li className="nav-item">
                        <Link
                          className="nav-link m-0 impression"
                          to="/gallery"
                          style={{ color: "white", fontWeight: "500" }}
                        // onClick={closeMobileMenu} // Close menu when clicked
                        >
                          Gallery
                        </Link>
                      </li>
                    </div>

                  

                    <div className="col d-flex align-items-center justify-content-center text-md-center"

                    >

                      <li className="nav-item"   >
                        <Link
                          className="nav-link m-0 impression"

                          to='/blog'

                          style={{ color: "white", fontWeight: "500" }}
                        
                        >
                          Blog
                        </Link>
                      </li>
                    </div>

                    <div className="col d-flex align-items-center justify-content-center text-md-center">
                      <li className="nav-item">
                        <Link
                          className="nav-link m-0 impression"
                          to="/contact-us"
                          style={{ color: "white", fontWeight: "500" }}
                        // onClick={closeMobileMenu} // Close menu when clicked
                        >
                          Contact Us
                        </Link>
                      </li>
                    </div>

               
                      {isLoggedIn ? (
                        <>
                          <div className="col text-end d-flex align-items-center justify-content-end me-5">

                            <li
                              className="nav-item d-flex align-items-center justify-content-end me-3"
                              style={{
                                color: "white",
                                cursor: "pointer",
                              }}
                              onClick={uploadModalScreen}
                              title="Upload Art"
                              
                            >
                            <img src={abc} alt="" className="img-fluid" style={{background:'#0D0D0F',color:'white',width:'25px',height:'25px'}}/>
                              {/* <PublishOutlinedIcon  style={{ color: 'white' }} />
                              <p className="openSans-300 m-0 w-100 mx-2" style={{ color: 'white' }} >PUBLISH ART</p> */}
                            </li>
                          </div>
                          <div className="col text-center d-flex align-items-center">
                            <li className="nav-item">
                              <UserFlow isLoggedIn={loggedin} />
                            </li>
                          </div>



                        </>
                      ) : (
                        <div className="col text-center d-flex align-items-center">
                        <li className="nav-item">
                          <a
                            className="nav-link m-0 impression border-0"
                            href="#"
                            onClick={loginModalScreen}
                            style={{
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            Login / Register
                          </a>
                          {isOpen && (
                            <Login
                              handleClose={handleClose}
                              isLoggedIn={loggedin}
                            />
                          )}
                        </li>
                         </div>
                      )}


            <div className="col d-flex align-items-center justify-content-left text-md-center">
                      <li className="nav-item">
                        <Link
                          className="nav-link m-0"
                          to="#"
                          style={{ color: "white", fontWeight: "400" }}
                          
                        // onClick={closeMobileMenu} // Close menu when clicked
                        >
                          <div className="d-flex align-items-center">
                              <SearchIcon onClick={showSearchBar}/>
                              {showSearch?
                              (<>
                              <input className="form-control mx-2" type="search" style={{background:'transparent' ,color:'white'}} />
                              </>)
                            :
                            ('')}
                          </div>
                       

                        </Link>

                      </li>
                    </div>
                   


                  </ul>
                </div>
              </div>

              <button
                className="navbar-toggler mt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                variant="outlined"
                style={{ border: "none" }}
                onClick={toggleMobileMenu}
              >
                <span
                  className="navbar-toggler-icon text-white justify-content-left d-flex"
                  variant="outlined"
                  style={{ border: "none" }}
                >
                  <FontAwesomeIcon icon={faList} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <UPloadArtAndMusic
        closeModal={uploadModalScreen}
        ModalIsOpen={uploadArtMusicModalOpen}
      />

      {/* <UserUploadArtFile 
        closeModal={uploadModalScreen}
        ModalIsOpen={uploadArtMusicModalOpen}
      /> */}


<ModalHandler 
       closeModal={loginModalScreen}
       ModalIsOpen={newLoginModal}
       screenshift={screenshift}
       shiftCountplus={shiftCountplus}
       shiftCountminus={shiftCountminus}
       restscreenplus={restscreenplus}
       restscreenminus={restscreenminus}
       interestscreenplus={interestscreenplus}
       interestscreenminus={interestscreenminus}

      />
    </>
  );
};

export default TopNavbar;
