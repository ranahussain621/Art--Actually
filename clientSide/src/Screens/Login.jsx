import React, { useState, useEffect } from "react";
import loginLogo from "../assets/images/loginLogo.png";
import cardImage6 from "../assets/images/cardImage6.png";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginModal.css";
import ResetPassword from "./ResetPassword";
import Cookies from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth/authSlice";
import { instance } from "../redux/axios/axios";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login({isOpen, handleClose}) {
  const [showSignup, setShowSignup] = useState(false);
  const [showRestPassword, setshowRestPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [rememberMe, setRememberMe] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

//   const responseGoogle = async () => {
//     try {
//        // Send the Google token to the server for verification
//        const res = await axios.get(`http://localhost:4000/authenticate/google/callback`);
//        console.log(res.data);
//     } catch (error) {
//        console.error(error);
//     }
//  };

  const GoogleClientID = process.env.REACT_APP_GOOGLE_ClIENT_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when input changes
  };


  useEffect(() => {
    const storedUserEmail = Cookies.get('userEmail');
    const storedPassword = Cookies.get('userPassword');
  
    if (storedUserEmail && data.email === "" && storedPassword && data.password === "") {
        setData({
            ...data,
            email: storedUserEmail,
            password:storedPassword,
        })
      
      
    }
  }, [data]);

  const validateInputs = () => {
    let isValid = true;
    const updatedErrors = {};

    if (!data.email) {
      updatedErrors.email = "Email is required";
      isValid = false;
    }

    if (!data.password) {
      updatedErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const navigate = useNavigate();



  const dispatch = useDispatch();
  const login = async () => {
    if (!validateInputs()) {
      return;
    }

    if (validateInputs) {
      const res = await dispatch(loginUser(data));
      const val = res.payload;
      try {
        if (val?.success === true) {
          if (val?.Role?.title === "user") {
            toast.success(val?.message, {
              position: "top-center",
              autoClose: 1000,
            })

            handleClose()
            localStorage.setItem("user", JSON.stringify(val));
            navigate("/dashboard/user-dashboard");
          }
          if (val?.Role?.title === "admin") {
            toast.success(val?.message, {
              position: "top-center",
              autoClose: 1000,
            })

            handleClose()
            localStorage.setItem("user", JSON.stringify(val));
            navigate("/dashboard/admin-dashboard");
          }
        }
        if (val?.success === false) {
          toast.error(val?.message, {
            autoClose: 1000,
            position: "top-center",
          });
        }
    if(rememberMe){
      Cookies.set('userEmail',data.email , { expires: 30 })
      Cookies.set('userPassword',data.password , { expires: 30 })
    }
    if(!rememberMe){
      Cookies.remove("userEmail")
      Cookies.remove("userPassword")
    }

      } catch (error) {
        toast.warn(error, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }
  };

  // Handlers for showing/hiding signup and reset password screens
  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
  };

  const handleshowRestPassword = () => {
    setshowRestPassword(true);
  };

  const handleRestPasswordClose = () => {
    setshowRestPassword(false);
  };




  return (
    <>
      <div
        className={
          isOpen
            ? "modal-show-compare display-block"
            : "modal-show-compare display-none"
        }
      
      >
        <div className="modal-content-compare rounded-3 p-0 mt-2">
          <div class="h-100 d-flex  justify-content-center">
            <div
              className="d-flex align-items-start mt-2 ms-2"
              style={{
                height: "33px",
                width: "33px",
               
                padding: "4px",
                paddingBottom: "2px",
                borderRadius: "5px",
                textAlign: "center",
                marginLeft: "3px",
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="fs-4 ps-1"
                onClick={() => {
                  handleClose();
                }}
                style={{ color: "#709AA4", cursor: "pointer" }}
              />
            </div>
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="px-2 py-2 rounded-start">
                   <div className="container">
                  <h4
                    className="text-center fw-bold"
                    style={{ color: "#709DA7" }}
                  >
                    Welcome Back to
                  </h4>
                  <div className="d-flex justify-content-center py-3">
                    <img
                      src={loginLogo}
                      alt=""
                      style={{ maxWidth: "200px" }}
                    />
                  </div>

                  <div>
                    <div className="py-2">
                      <div className="form-group py-2 mt-2">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="error text-danger text-start pt-1 ps-2">
                           <small> {errors.email}</small>
                          </p>
                        )}
                      </div>
                      <div className="form-group mt-2">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={data.password}
                          onChange={handleChange}
                          autoComplete="none"
                        />
                         {errors.password && (
                          <p className="error text-danger text-start pt-1 ps-2">
                           <small> {errors.password}</small>
                          </p>
                        )}
                      </div>
                      <div className="d-flex py-2 d-flex align-items-center mt-2 justify-content-between w-100">
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            style={{ fontSize: "14px" }}
                            className="form-check-input"
                            id="flexCheckDefault"
                            checked={rememberMe}
                            onChange={() => {
                              setRememberMe(!rememberMe);
                            }}
                          />
                          <span
                            className="text-cadet px-2 "
                            style={{ fontSize: "14px", color: "#709DA7" ,fontWeight:'700'}}
                            htmlFor="flexCheckDefault"
                          >
                            Keep me logged in
                          </span>
                        
                        </div>
                          <a
                            href="#"
                            className="text-decoration-none  fw-bold"
                            style={{ fontSize: "14px", color: "#709DA7" }}
                            onClick={()=>{
                             
                              handleshowRestPassword()
                               
                            }}
                          >
                            Forgot Password
                          </a>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid text-center">
                    <button
                      type="button"
                      style={{ backgroundColor: "#709DA7", color: "white" ,fontWeight:'600'}}
                      className="btn  py-1"
                      onClick={login}
                    >
                      Log in
                    </button>
                    <p className="text-cadet mt-2" style={{ color: "#709DA7" }}>
                      OR
                    </p>
                  </div>

                  <div className="mb-2 rounded-circle d-grid text-center">
                  {/* <GoogleOAuthProvider clientId={GoogleClientID} style={{borderRadius:'50%'}}>

<GoogleLogin  
    onSuccess={  (credentialResponse) => {
      console.log(credentialResponse)
        //  var decoded = jwt_decode(credentialResponse.credential);
        // console.log(decoded);
    }}
    onError={() => {
        console.log('Login Failed');
    }}
/>

</GoogleOAuthProvider> */}
        {/* <GoogleLogin
            clientId={GoogleClientID}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
         /> */}
          </div>

                  <div className="mt-2 text-center">
                    <span
                      className=" text-cadet font-18 px-2"
                      style={{ color: "#709DA7" }}
                    >
                      Don't have an account yet?
                    </span>
                    <a
                      href="#"
                      className="text-decoration-none text-dark fw-bold"
                      onClick={handleShowSignup}
                    >
                      Sign up
                    </a>
                  </div>

                  <p
                    className="text-cadet text-center mt-2"
                    style={{
                      fontSize: "12px",
                      color: "#709DA7",
                      textAlign: "center",
                    }}
                  >
                    By continuing, you agree to ArtActually's <span style={{fontWeight:'700'}}>Terms of Services</span>
                    <br /> and acknowledge you've read our <span style={{fontWeight:'700'}}>Privacy Policy</span> .
                    Notice at collection.
                  </p>
                </div>
                </div>
               
              </div>
              <div className="col-md-6">
                <div style={{ textAlign: "center" }}>
                  <img src={cardImage6} alt="" className="login-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSignup && (
          <Signup handleClose={handleSignupClose} loginClose={handleClose} />
        )}
        {showRestPassword && (
          <> 
          <ResetPassword  handleClose={handleRestPasswordClose} loginClose={handleClose} />
         
          </>
         
        )}
      </div>
    </>
  );
}

export default Login;
