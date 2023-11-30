import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import UploadMusicDetail from './UploadMusicDetail';
import UploadMusicVisibility from './UploadMusicVisibility';
import uploadBlog from '../../../assets/icons/uploadblog.png'
import { faCamera, faShareNodes } from '@fortawesome/free-solid-svg-icons';



const UploadFile = (props) => {
  const [processing, setProcessing] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [userImage, setuserImage] = useState()
  const [sendData, setsendData] = useState('')
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setProcessing(processing + 1);
    if (file) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
  
      audio.addEventListener('loadedmetadata', () => {
        const durationInSeconds = audio.duration;
        const durationInMinutes = (durationInSeconds / 60).toFixed(2); // Convert to minutes with 2 decimal places
        setDuration(durationInMinutes + ' min');
      });
    }
  };

  const screenStepperBack = () => {
    setProcessing(processing - 1);
  };

const getUserImage =(img)=>{
setuserImage(img)
}

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setProcessing(processing + 1);
  };

  const sendDataTovisibilityModal=(data)=>{
    setsendData(data)
  }


  const selectPic = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; 
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0]; 
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setSelectedFile((prevState) => ({
          ...prevState,
          image: file,
          imageURL,
        }));
      }
    });
    fileInputRef.current.click()
  };

  return (
    <>
      <div className="card  border-0">
        <div className="card-body">
          <div className="title row border-bottom">
            <div className="col">
              <p className="mb-1 fw-bold fs-4" style={{ color: '#74A8B0' }}>
                Upload Music
              </p>
            </div>
            <div className="col d-flex justify-content-end">
              <FontAwesomeIcon className='fs-3 text-muted' style={{cursor:'pointer'}}  icon={faXmark} onClick={props.closeWindow} />
            </div>
          </div>
          {processing === 1 ? (
         


<div className="d-flex justify-content-center"  >
<div>
  
<div className="profile-image-container">
                    

                    <div className="avatar mt-2 d-flex align-items-end" onClick={() => fileInputRef.current.click()}>
                      <img
                        src={uploadBlog}
                        className=" img-fluid  "
                        style={{ position: 'relative', width: '294px', height: '295px' }}
                        alt="Avatar"
                      />
                      <div className="rounded-circle d-flex justify-content-center align-items-center "
                        style={{
                          background: '#74A8B0',
                          position: 'relative',
                          width: '50px',
                          height: '50px',
                          right: '20px',
                          top: '10px'
                        }}>
                        <FontAwesomeIcon icon={faCamera} className="camera-icon " style={{ color: "white" }} />

                      </div>

                    </div>
                  </div>
  <div className="text-center  pt-5" type='button'
 >
    <p className="fw-semibold h5" style={{ color: '#74A8B0' }}>
      Select Music File to Upload
    </p>
    <p style={{ fontSize: '12px' }} className="text-muted">
      Your Music will be private until you publish them
    </p>
 
  <input
      type="file"
      ref={fileInputRef}
      
      style={{ display: 'none' }}
      accept="audio/*"
      onChange={handleFileSelect}
      onDragOver={handleDragOver}
       onDrop={handleDrop}
    />
    <button className='btn rounded-3' style={{background:'#709BA5' , color:'white', borderRadius:"50px"}} onClick={selectPic}>
          Select Files
      </button>
  </div>
</div>
</div>












          ) : processing === 2 ? (
         
             <UploadMusicDetail 
             selectedFile={selectedFile} 
             duration={duration}
             passToParent={sendDataTovisibilityModal}
             userimageuplift={getUserImage}
             nextPage={() => setProcessing(processing + 1)} />
          ) : processing === 3 ? (
            <>
                <UploadMusicVisibility 
                 selectedFile={selectedFile} 
                 duration={duration}
                  userImage={userImage}
                backPage={screenStepperBack} 
                allDetail = {sendData}
                close={props.closeWindow} />
            </>
          ) : 
          ('')
           }
        </div>
      </div>
    </>
  );
};

export default UploadFile;
