// import React,{useState,useRef} from 'react'
import img1 from '../../../assets/images/blogbar.jpg';
import { faForwardStep,faBackwardStep,faCirclePlay,faShuffle,faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icon from '../../../assets/images/icon.png'
import './song.css'


const Songs = () => {



   
     

  return (
    <div className="container-fluid my-4" >
     <div className="row d-flex align-items-center pt-4" style={{background:'rgba(29, 33, 35, 0.30)'}}>
   <div className="col-md-4 col-sm-12 ps-5">
   <div className="col ps-5">
              <div className="d-flex ps-5 m-0 w-100">
                <div className='d-flex align-items-center'>
                  <img
                    src={img1}
                    alt=""
                    style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                  />
                </div>
                <div style={{ lineHeight: 'normal' }} className=" ps-2 d-flex align-items-center pt-3">
                  <span className="text-middle ">
                    <p className="m-0 text-middle" style={{ color: 'white', fontWeight: '500' }}>
                    Seasons in
                  </p>
                  <p className="" style={{ color: 'rgba(255, 255, 255, 0.44)' }}>
                    James
                  </p>
                  </span>
                  
                </div>
              </div>
            </div>
   </div>
   <div className="col-md-4 col-sm-12  pe-5">
    <div className="row d-flex align-items-center">
        <div className="col">
            <div className="row">
            <div className="col">
                <FontAwesomeIcon icon={faShuffle} style={{color:"white"}} />
                </div>
                <div className="col">
                <FontAwesomeIcon icon={faBackwardStep} style={{color:"white"}} />
                </div>
                <div className="col">
                <FontAwesomeIcon icon={faCirclePlay} style={{color:"white"}} />
                </div>
                
                <div className="col">
                <FontAwesomeIcon icon={faForwardStep} style={{color:"white"}} />
                </div>
               
                <div className="col">
           <img src={icon} className='img-fluid rounded' alt="data" />       </div>
            </div>
        </div>
     
    </div>
   </div>
   <div className="col-md-4 col-sm-12  d-flex align-items-center ps-5">
   <FontAwesomeIcon className='pe-2' icon={faVolumeHigh} style={{color:'white'}} />
   <input
       
          type="range"
          className="volume-slider"
          // value={volume}
          min={0}
          max={1}
          step={0.01}
         
        />
   </div>
   <div className="col-md-12 my-3 mb-3 d-flex justify-content-center">
<div className="row w-100 justify-content-center">
  <div className="col-md-8">
    <input
        style={{color:"yellowgreen"}}
        className='w-100'
        type="range"
      />
  </div>
</div>
        
        
   </div>
     </div>
    </div>
  )
}

export default Songs