import React, { useState } from "react";
import axios from "axios";
import cardImage6 from "../assets/images/cardImage6.png";
import { toast } from 'react-toastify';

import "../Styles/SignupModal.css";
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "./redux/axios/axios";
const ResetPassword = (props) => {
  const { showRestPassword, handleClose } = props;
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
      method: 'post',  // HTTP request method
      url: `${baseURL}/auth/user-forget-link`,  // Request URL
      data: email,  // Request body data
      headers: {
        'Content-Type': 'application/json'  // Request headers
      }
    };

    axios(response)
      .then(Result => {
      
        toast.success(Result.data.message, {
          position: "top-center",
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="">
      </div>
      <div className={showRestPassword ? "modal-show-compare display-block" : "modal-show-compare display-none"} style={{ marginTop: '30px' }}>
        <div className="modal-content-compare rounded-0 ">

          <div className="h-100 d-flex justify-content-center">
            <div className="d-flex align-items-start">
              {/* <button type="button" className="btn-close text-end" aria-label="Close" onClick={() => {
                props.loginClose()
                handleClose()

              }}></button> */}
                <div className="d-flex align-items-start" style={{ height:"33px" , width:"33px", border:"1px solid  #709AA4", padding:"4px", paddingBottom:"2px",borderRadius:"5px", textAlign:"center"}}>
              
              <FontAwesomeIcon
          icon={faXmark}
          className="fs-3"
          onClick={() => {
            props.loginClose()
            handleClose()
          }}
          style={{color:"#709AA4"}}
        />
       
          
          </div>
            </div>

            <div className="d-flex align-items-center">

              <div className="px-5 py-2 rounded-start">

                <h3 className="text-center fw-bold" style={{ color: '#709DA7' }}>Reset Your Password</h3>
                <p className="text-center" style={{ color: '#709DA7' }}>What's your registered email?</p>

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

                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="py-2 d-grid text-center">
                  <button
                    type="button"
                    className="btn  py-2"
                    onClick={sendEmail}
                    style={{ backgroundColor: '#709DA7', color: 'white' }}
                  >
                    Send a New Password to Email
                  </button>
                </div>
              </div>

              {/* image */}
              <div>
                <img src={cardImage6} alt="" style={{ width: "400px", height: "580px" }} />
              </div>
            </div>
          </div>
          </div>
            </div>
            </>
);
}
export default ResetPassword;