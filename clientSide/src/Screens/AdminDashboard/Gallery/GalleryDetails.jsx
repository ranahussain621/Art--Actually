import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXmark } from "@fortawesome/free-solid-svg-icons";

const GalleryDetails = ({closeWindow,title,description,image}) => {
  return (
    <div className="row gallery-details-container mb-4">
         <div className="d-flex align-items-center" >
            <h3 className="my-3 w-100" style={{fontWeight:'400',letterSpacing:"0.9",color:'#709AA4', fontSize:"30px"}}>Art Details</h3>
            <div className='justify-content-end' onClick={closeWindow}>
               <div style={{ height:"28px" , width:"33px", border:"1px solid  #709AA4", padding:"2px", borderRadius:"5px", textAlign:"center"}}>
            <FontAwesomeIcon icon={faXmark} style={{color:"#709AA4"}}/>
            </div>
        </div>
        </div>
      
    <div className="col-md-6 col-sm-12 text-center">
        <div style={{background:'rgb(240,239,237)' ,}}>  
     <img className='img-fluid p-0 w-100' src={image} alt={title} style={{height:'400px'}} />
        </div>
    </div>
    <div className="col-md-6 col-sm-12 ps-4 pt-4">
        <div className="row">
            <h2 style={{fontWeight:'400', fontSize:"24px", color:"#000000", lineHeight:"29.05px"}}>
               {title} - <span style={{fontWeight:'400', fontSize:"24px", color:"#709DA7", lineHeight:"29.05px"}} className='text-muted'>
                    {/* BobbySossen */}
                </span>
            </h2>
        </div>
        <div className="row">
            <h4 style={{fontWeight:'400', fontSize:"18px", color:"#000000", lineHeight:"21.78px"}}>
                Printing / Pop Art / Honk Kong
            </h4>
        </div>
        <div className="row pt-2 text-muted">
            <p style={{textJustify:'center', fontWeight:'500', fontSize:"14px", color:"#707C97", lineHeight:"13px"}}>
                {description}              
            </p>
        </div>

       



        <div className="row">
            <h6 style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Format
            </h6>
        </div>
        <div className="row">
            <h6 className="text-muted" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Printing
            </h6>
        </div>

        <div className="row pt-2">
            <h6 style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Style
            </h6>
        </div>
        <div className="row">
            <h6 className="text-muted" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Pop Art
            </h6>
        </div>
        <div className="row pt-2">
            <h6 style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Dimensions
            </h6>
        </div>
        <div className="row">
            <h6 className="text-muted" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                500(w) * 500(h) mm
            </h6>
        </div>
    </div>
</div>
  )
}

export default GalleryDetails