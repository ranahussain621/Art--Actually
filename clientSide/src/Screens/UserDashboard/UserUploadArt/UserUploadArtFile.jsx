import React, { useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UserUploadArtDetail from './UserUploadArtDetail';
import uploadBlog from '../../../assets/upload.PNG'

const UserUploadArtFile = ({closeWindow}) => {
       
  

    const fileInputRef = useRef(null);

  const [processing, setProcessing] = useState(1);
  const [selectedFile, setSelectedFile] = useState({
    imageURL:null
  });

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
      <div className="card  border-0 rounded-1">
        <div className="card-body">
          <div className="title row border-bottom">
            <div className="col">
            <p className="mb-1 fs-4" style={{ color: '#74A8B0',fontWeight:'500' }}>
                Upload Images
              </p>
            </div>
            <div className="col d-flex justify-content-end">
              <FontAwesomeIcon className='fs-3 text-muted' style={{cursor:'pointer'}} icon={faXmark} onClick={closeWindow} />
            </div>
          </div>
          {processing === 1 ? (
            <div className="col-md-12 col-sm-12 ">
               <div className="d-flex justify-content-center"  >
              <div>
                
              <div className="d-flex justify-content-center my-md-4 mb-sm-2 m-0">
                    <div className="profile-image-container">
                    

                      <div className="avatar mt-2 d-flex align-items-end" onClick={() => fileInputRef.current.click()}>
                       
                         {selectedFile.imageURL ?   <img className="rounded" style={{height:'300px',width:'300px'}} src={selectedFile.imageURL} alt="Selected"  /> : (
                     <img
                          src={uploadBlog}
                          className=" img-fluid  "
                          style={{ position: 'relative', width: '350px', height: '300px' }}
                          alt="Avatar"
                        />
              )}
                        {/* <div className="rounded-circle d-flex justify-content-center align-items-center "
                          style={{
                            background: '#74A8B0',
                            position: 'relative',
                            width: '50px',
                            height: '50px',
                            right: '20px',
                            top: '10px'
                          }}>
                          <FontAwesomeIcon icon={faCamera} className="camera-icon " style={{ color: "white" }} />

                        </div> */}

                      </div>
                    </div>

                  </div>
                <div className="text-center" type='button'
               >
                  <p className="fw-semibold h5" style={{ color: '#74A8B0' }}>
                    Drag and drop image files to upload
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
                
                </div>
              </div>
            </div>
            <div className="text-center">
                        <button className=' btn text-white rounded' style={{background:'#7d9093',textTransform:'uppercase',letterSpacing:'0.3px',fontWeight:'400'}} onClick={selectPic}>Select Files </button>
  
            </div>
            </div>
       
           ) : processing === 2 ? (
             <>
               <UserUploadArtDetail selectedFile={selectedFile} nextPage={() => setProcessing(processing + 1)} close={closeWindow}  />
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

export default UserUploadArtFile;
