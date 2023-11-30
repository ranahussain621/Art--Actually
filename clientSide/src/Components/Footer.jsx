import React from 'react'

import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGooglePlus,
  faInstagram,
  faSquareYoutube,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const Footer = () => {
  return (
   <>

  <div className="col-md-12 text-center  " style={{backgroundColor:'rgb(134 193 205)', overflowX: 'hidden'}}>
              <div className="row justify-content-center align-items-center p-3 m-0">
                <div className="col-md-5 d-flex justify-content-center">
                <img src={logo} alt=""  width={280}/>
                </div>
               
              </div>
              <div className="row justify-content-center">
              <div className="col-md-5 col-sm-8 col-12">
                <div className="col-md-10 ms-5">
             

<TextField className='w-100 fw-bolder'
     id="standard-basic" label="Search art by keyword" variant="standard" style={{color:'cadetblue',fontWeight:'700'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <span style={{ color: 'white', fontWeight: 'bolder',fontSize:'13px',letterSpacing:'0.5px',fontFamily:'Open Sans' }}>SEARCH <span className="" style={{color:'white',fontSize:'16px',fontWeight:'bolder'}}> {'>'} </span></span>
          </InputAdornment>
        ),
      }}
      
      InputLabelProps={{ 
        style: { color: 'lightblue', fontWeight: 'bold' }
      }}
    />

                </div>
              
               
                  <div className="row justify-content-center  mt-4">
                    <div className="col-2 ">   <FontAwesomeIcon style={{fontSize:'42px',color:'#eeeeeebf'}} icon={faFacebook} /></div>
                    <div className="col-2"><FontAwesomeIcon style={{fontSize:'42px',color:'#eeeeeebf'}} icon={faGooglePlus} /></div>
                    <div className="col-2"><FontAwesomeIcon style={{fontSize:'42px',color:'#eeeeeebf'}} icon={ faInstagram} /></div>
                    <div className="col-2"><FontAwesomeIcon style={{fontSize:'42px',color:'#eeeeeebf'}} icon={ faSquareYoutube} /></div>
                    <div className="col-2"><FontAwesomeIcon style={{fontSize:'42px',color:'#eeeeeebf'}} icon={ faTwitterSquare} /></div>

                  </div>
                  <div className="row mt-3">
                    <div className="col-5 text-end fw-bold p-0 openSans-400" ><p><Link to='/contact-us' style={{color:'#f0f6ff',textDecoration:'none'}}>CONTACT US</Link> </p></div>
                    <div className="col-1 text-center fw-bold p-0" ><p style={{color:'#f0f6ff'}}>|</p></div>
                    <div className="col-5 text-start fw-bold p-0 openSans-400" ><p style={{cursor:'pointer'}}><Link style={{textDecoration:'none',color:'#f0f6ff'}} to='/Terms&Use'> TERMS & CONDITIONS </Link></p></div>
                    <div className="col-12 mb-2 openSans-600" style={{color:'#f0f6ff'}}>(C) ART ACTUALLY INC. MMXXXVIII</div>
        </div>
                </div>
              </div>

            </div>

   
   
   </>
  )
}
