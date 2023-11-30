
import React, { useEffect, useState } from "react";
import axios from "axios";
import cardImage6 from "../../assets/images/cardImage6.png";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import "../Styles/forgetpasswordmodal.css";
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from "../../redux/axios/axios";

const NewResetPassword = ({screenMinu,closeModal}) => {
  const [email, setemail] = useState({ email: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setemail({ ...email, [name]: value });
    setError('');
  }

  const sendEmail = async () => {
    if (!email.email) {
      setError('Please enter your email');
      return;
    }

    const response = {
      method: 'post', 
      url: `${baseURL}auth/user-forget-link`, 
      data: email,  // Request body data
      headers: {
        'Content-Type': 'application/json'  
      }
    };

    axios(response)
      .then(Result => {
        toast.success(Result.data.message, {
          position: "top-center",
        })

      })
      .catch(error => {
        console.error(error);
      });
      
      closeModal()
  }


  return (
    <>
    
      
          <div className="h-100 d-flex justify-content-center me-1">
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
                className="fs-4 ps-1 "
                onClick={() => {
                  closeModal();
                }}
                style={{ color: "#709AA4", cursor: "pointer" }}
              />
            </div>

            <div className="row align-items-center">
              <div className="col-md-6 p-0">
               <div className=" py-2 rounded-start" style={{paddingLeft:'3.5rem',paddingRight:'3.5rem'}}>

                <h3 className="text-center fw-bold" style={{ color: '#709DA7' }}>Reset Your Password</h3>
                <p className="text-center" style={{ color: '#709DA7',opacity:0.7 }}>What's your registered email?</p>

                <div>
                  <div className="py-2">
                    <div className="form-group py-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>

                    {error && <p className="text-danger text-start">{error}</p>}
                  </div>
                </div>

                <div className="py-2 d-grid text-center">
                  <button
                    type="button"
                    className="btn py-1"
                    onClick={sendEmail}
                    style={{ backgroundColor: '#709DA7', color: 'white',fontWeight:'600' }}
                  >
                    Send a password reset email
                  </button>
                  <div className="my-2 text-center">
                  <span className=" " style={{ color: "#709DA7" }}>
                    {" "}
                    back to 
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
                </div>
              </div>

              </div>
    <div className="col-md-6 p-0"> 
     <div style={{ textAlign: "center" }}>
                <img src={cardImage6} alt="" className="login-img" />
              </div>
      </div>
            </div>

            <div className="d-flex align-items-center">

             

              {/* image */}
            
            </div>
          </div>
        
      
    </>
  );
}
export default NewResetPassword;