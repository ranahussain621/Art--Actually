

  import React, { useState } from "react";

import { toast } from "react-toastify";
import cardImage6 from "../../assets/images/cardImage6.png";
// import "../Styles/SignupModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/auth/authSlice";
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



const NewSingUp = ({screenMinu, closeModal,steppershow}) => {
  const [showinterest, setshowinterest] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vip:false
  });

  // const GoogleClientID = process.env.REACT_APP_GOOGLE_ClIENT_ID;



  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the previous error for the field

  };

  const handleCheckBox = (e) =>{
    const {name,checked} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: checked
    }));  
  }


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

    if (!data.firstName) {
      updatedErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!data.lastName) {
      updatedErrors.lastName = "Sur Name is required";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };
 
  const dispatch = useDispatch()
  const signup = async () => {
     await dispatch(registerUser(data))
   .then((res)=>{
 const val = res.payload 
   try {
      if(val?.success === true){
        steppershow()
        toast.success(val?.message,{
          autoClose:1000,
          position: "top-center",
        })
       
      }
      else{
        toast.error("user Already existed please login",{
          autoClose:1000,
          position: "top-center",
        })
        screenMinu()
      }
     } catch (error) {
         toast.error(error,{
          autoClose:1000,
          position:'top-center'
         })
     }

   })
  
  
  
   
    
   
  }
  
  //this handler is for show reset password screen
  const handleshowinterest = () => {
    if (validateInputs()) { // Check if inputs are valid
      signup();
      
      setshowinterest(true);
      
    } 
  };
 const navigate = useNavigate()
  const move = () => {
      closeModal()
    navigate('/Terms&Use')
  
  }
  
  const privacy = () => {
    closeModal()
  navigate('/privacy-policy')

}

  return (
    <>
     
          <div className=" h-100 d-flex justify-content-center ">
          <div className="d-flex align-items-start ms-2 mt-2"
           style={{ height:"33px" , width:"33px", padding:"4px", paddingBottom:"2px",borderRadius:"5px", textAlign:"center"}}>
              
              <FontAwesomeIcon
          icon={faXmark}
          className="fs-4 ps-1"
          onClick={() => {
            closeModal()
        }}
          aria-label="Close"
          style={{color:"#709AA4",cursor:'pointer'}}
        />
       
          
          </div>
           

            <div className="row align-items-center">
            <div className="col-md-6 p-0">
              <div className="px-5 py-2 rounded-start">
                <div className="container ">
                <h4
                  className="text-center fw-bold"
                  style={{ color: "#709DA7" }}
                >
                  Welcome to Art Actually
                </h4>
                
<h5
                  className="text-center fw-semibold"
                  style={{ color: "#709DA7" }}
                >
                  Art is an essential
                </h5>
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
                        autoComplete="none"
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
                        placeholder="Create a Password"
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

                    <div className="form-group py-2 mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={data.firstName}
                        onChange={handleChange}
                        autoComplete="none"
                      />
                       {errors.firstName && (
                          <p className="error text-danger text-start pt-1 ps-2">
                           <small> {errors.firstName}</small>
                          </p>
                        )}
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={data.lastName}
                        onChange={handleChange}
                        autoComplete="none"
                      />
                       {errors.lastName && (
                          <p className="error text-danger text-start pt-1 ps-2">
                           <small> {errors.lastName}</small>
                          </p>
                        )}
                    </div>

                   <div className="d-flex mt-4">
                    
                    <input type="checkbox" name="vip" id="" className="rounded-3" checked={data.vip} onChange={handleCheckBox} />
                    <label htmlFor="" className="text-muted ps-1">Vip Member</label>
                   </div>

                    <div></div>
                  </div>
                </div>

                <div className="py-2 d-grid text-center">
                  <button
                    type="button"
                    className="btn  py-2"
                    style={{ backgroundColor: "#709DA7", color: "white" ,fontWeight:'600'}}
                     onClick={handleshowinterest}
                  >
                    Continue
                  </button>
                  <p className="text-cadet my-2">OR</p>
                </div>
               {/* <div className="d-grid text-center border border-2 rounded-5" type="button" onClick={googleAuth}>
                  <a href="#" className="  text-decoration-none p-2">
                    <div className="">
                      <img
                        className="icon pe-3"
                        src={google}
                        alt="google"
                        height="23"
                      />
                      <span style={{ color: "#709DA7" }}>
                        Continue with Google
                      </span>
                    </div>
                  </a>
                </div>  */}
                 {/* <div className="mb-2 rounded-circle d-grid text-center">
                  <GoogleOAuthProvider clientId={GoogleClientID} style={{borderRadius:'50%'}}>

<GoogleLogin  
    onSuccess={  (credentialResponse) => {
      console.log(credentialResponse)
         var decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
    }}
    onError={() => {
        console.log('Login Failed');
    }}
/>

</GoogleOAuthProvider>
          </div> */}
                <div className="my-2 text-center">
                  <span className=" " style={{ color: "#709DA7" }}>
                    {" "}
                    Already a member?
                  </span>
                  <a
                    href="#"
                    onClick={() => {
                    //   handleClose();
                    screenMinu()
                    }}
                    className="text-decoration-none text-cadet fw-bold text-dark font-18 px-2"
                  >
                    Log in
                  </a>
                </div>
                <p
                  className="text-cadet text-center"
                  style={{ fontSize: "12px", color: "#709DA7", textAlign:"center",  }}
                >
                  By continuing, you agree to ArtActually's <span style={{fontWeight:'700',cursor:'pointer'}} type="button" onClick={move}> Terms of Services </span>
                    <br /> and acknowledge you've read our <span style={{fontWeight:'700',cursor:'pointer'}} onClick={privacy}>Privacy Policy</span> .
                    Notice at collection.
                 
                </p>
              </div>
              </div>
              
              </div>
              {/* image */}
              <div className="col-md-6 p-0">
              <div style={{textAlign:"center"}}>
                <img
                  src={cardImage6}
                  alt=""
                  className="login-imgg"
                />
              </div>
              </div>
            </div>
          </div>
       
        {/* {showinterest && <Stepper handleClose={handleinterestClose} loginClose={handleClose} />} */}
    </>
  );
};

export default NewSingUp;
