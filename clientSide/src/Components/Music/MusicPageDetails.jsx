import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXmark } from "@fortawesome/free-solid-svg-icons";
import img4 from '../../assets/images/music4.png'

const MusicPageDetails = ({closeWindow,title,description,image,file}) => {



 

   
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
     <img className='img-fluid p-0 w-100' src={image ? image[0] : img4} alt={title} style={{height:'400px'}} />
        </div>
    </div>
    <div className="col-md-6 col-sm-12 ps-4 pt-4">
        <div className="row">
        <h2 style={{fontWeight:'400', fontSize:"24px", color:"#000000", lineHeight:"29.05px",textTransform:"capitalize"}}>
               {title}  <span style={{fontWeight:'400', fontSize:"24px", color:"#709DA7", lineHeight:"29.05px"}} className='text-muted'>
                    {/* BobbySossen */}
                </span>
            </h2>
        </div>
        {/* <div className="row pt-2">
        <h4 style={{fontWeight:'400', fontSize:"18px", color:"#000000", lineHeight:"21.78px"}}>
                Music / Pop Art 
            </h4>
        </div> */}
        <div className="row pt-2 text-muted">
        <p style={{textJustify:'center', fontWeight:'500', fontSize:"14px", color:"#707C97", lineHeight:"13px" ,textTransform:"capitalize"}}>
                {description}              
            </p>
        </div>

       


        <div className="row mt-4">
        <h6 style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Format
            </h6>
        </div>
        <div className="row">
        <h6 className="text-muted" style={{fontWeight:'400', fontSize:"14px", color:"#000000", lineHeight:"16.94px"}}>
                Music
            </h6>
        </div>

      

    <div className="row mt-5">
         <audio
                //    ref={audioRef}
                    src={file[0]}
                    controls
                    // preload="none"
                    className="w-100"
                    // onPlay={() => handlePlay(audioRef.current)}
                  /> 
    </div>
    </div>
</div>
  )
}

export default MusicPageDetails