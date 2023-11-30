import React, { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UploadArtDetail from './UploadArtDetail';
import pic from '../../../assets/images/pic.png'


const UploadArtFile = (props) => {
       

    const fileInputRef = useRef(null);

  const [processing, setProcessing] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
       
          setSelectedFile(file);
          setProcessing(processing + 1);
        };
        
   

  };

  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setProcessing(processing + 1);
  };




  

  return (
    <>
      <div className="card  border-0 rounded-1">
        <div className="card-body">
          <div className="title row border-bottom">
            <div className="col">
            <p className="mb-1 fs-4" style={{fontWeight:'400',letterSpacing:"0.9",color:'#709AA4', fontSize:"30px"}}>
                Upload Art
              </p>
            </div>
            <div className="col d-flex justify-content-end">
            <div style={{ height:"28px" , width:"33px", border:"1px solid  #709AA4", padding:"2px", borderRadius:"5px", textAlign:"center"}}>
              <FontAwesomeIcon icon={faXmark} onClick={props.closeWindow} style={{color:"#709AA4"}} />
              </div>
            </div>
          </div>
          {processing === 1 ? (
            
            <div className="d-flex justify-content-center"  onClick={() => fileInputRef.current.click()}>
              <div>
                
                <div className="d-flex justify-content-center py-3 px-5">
                  <div
                    className="rounded-circle  py-5 px-5 "
                   
                  >
                   
                    <img src={pic} className='img-fluid' alt="" style={{width:'150px'}} />
                  </div>
                </div>
                <div className="text-center  pt-5" type='button'
               >
                  <p className="fw-semibold h5" style={{ color: '#74A8B0' }}>
                    Select Art File to Upload
                  </p>
                  <p style={{ fontSize: '12px' }} className="text-muted">
                    Your Art will be private until you publish them
                  </p>
               
                <input
                    type="file"
                    ref={fileInputRef}
                    
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileSelect}
                    onDragOver={handleDragOver}
                     onDrop={handleDrop}
                  />
                  <button className='btn rounded-3' style={{background:'#709BA5' , color:'white', borderRadius:"50px"}}>
                        Select Files
                    </button>
                </div>
              </div>
            </div>
       
           ) : processing === 2 ? (
             <>
               <UploadArtDetail selectedFile={selectedFile} nextPage={() => setProcessing(processing + 1)} close = {props.closeWindow} />
             </>
             )
         : 
         (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default UploadArtFile;
