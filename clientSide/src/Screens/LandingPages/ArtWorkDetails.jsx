import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXmark } from "@fortawesome/free-solid-svg-icons";
import { baseURL } from '../../redux/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getArtDetails } from '../../redux/features/auth/authSlice';






const ArtWorkDetails = ({closeWindow,selectedItem}) => {

const [details, setdetails] = useState()

const dispatch = useDispatch()

const {isLoading}= useSelector((state)=>state.auth)


useEffect(()=>{
    const getData = async()=>{
          const val = await dispatch(getArtDetails({id:selectedItem?._id}))
          const data = val.payload.data
         
          setdetails(data)
    }
  getData()
},[selectedItem?._id,dispatch])
 

function splitDescription(description) {
    if (!description) return null;
  
    const words = description.split(' ');
    const lines = [];
    let line = '';
  
    for (let i = 0; i < words.length; i++) {
      if ((line + words[i]).trim().length <= 60) {
        line += ` ${words[i]}`;
      } else {
        lines.push(line.trim());
        line = words[i];
      }
    }
  
    if (line.trim() !== '') {
      lines.push(line.trim());
    }
  
    return lines.map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  }
  


   
  return (
    <>
    {
        isLoading ? (
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
           ) :   (
                <div className="row gallery-details-container mb-4 rounded-3">
         <div className="d-flex align-items-center" >
         <h3 className="my-3 w-100 openSans-400" style={{fontWeight:'400',letterSpacing:"0.9",color:'#709AA4', fontSize:"30px"}}>Art Details1</h3>
            <div className='justify-content-end' onClick={closeWindow}>
            <div style={{ height:"28px" , width:"33px",  padding:"2px", borderRadius:"5px", textAlign:"center"}}>
            <FontAwesomeIcon icon={faXmark} style={{color:"#709AA4",cursor:'pointer'}}/>
            </div>
        </div>
        </div>

        <div className="col-md-6 text-center">
            <img src={details?.image} alt="" className='img-fluid w-100 px-3 mt-2'  style={{height:'380px'}}/>
        </div>
        <div className="col-md-6 col-sm-12 ps-4 pt-4">
        <div className="row">
        <h2  className='openSans-400' style={{ fontSize:"24px", color:"#000000", lineHeight:"29.05px"}}>
              Title - <span style={{fontWeight:'400', fontSize:"24px", color:"#709DA7", lineHeight:"29.05px",textTransform:'capitalize'}} className='text-muted openSans-400'>
                    {details?.title} 
                </span>
            </h2>
        </div>
    
        <div className="row">
        <h2 className='openSans-400' style={{fontWeight:'400', fontSize:"24px", color:"#000000", lineHeight:"29.05px"}}>
              Artist - <span className='openSans-400 text-muted' style={{fontSize:"24px", color:"#709DA7", lineHeight:"29.05px" ,textTransform:'capitalize'}} >
                    {details?.artist}
                </span>
            </h2>
        </div>
    
        <div className="row pt-4 text-muted">
        <p  className='openSans-400 fw-semibold'style={{textJustify:'center', fontSize:"14px", lineHeight:"13px" ,textTransform:'capitalize'}}>
                Description            
            </p>
        </div>

        <div>
  <p className='openSans-400' style={{ textJustify: 'center', fontSize: '14px', color: '#707C97' }}>
    {splitDescription(details?.description)}
  </p>
</div>



        <div className="row">
        <h6 className='openSans-400' style={{fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Format
            </h6>
        </div>
        <div className="row">
        <h6 className="text-muted openSans-400" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px", textTransform:'capitalize'}}>
                {details?.format_title}
            </h6>
        </div>

        <div className="row pt-2">
        <h6 className='openSans-400' style={{ fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Style
            </h6>
        </div>
        <div className="row">
        <h6  className="text-muted openSans-400" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px" ,textTransform:'capitalize'}}>
                {details?.style_title}
            </h6>
        </div>
   

    
    </div>
      
   
</div>
           )  
    }
    </>
    

  )
}

export default ArtWorkDetails