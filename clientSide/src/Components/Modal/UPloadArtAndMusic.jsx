

import { Box, IconButton, } from "@mui/material";
  import React, { useState } from "react";
  import Modal from "react-modal";
  // import CloseIcon from "@mui/icons-material/Close";
  import "../../Styles/uploadmusicModal.css"
  import UploadFile from '../UploadArt/uploadMusicFile/UploadFile';
  import UserUploadArtFile from '../../Screens/UserDashboard/UserUploadArt/UserUploadArtFile'
  // import uploadMusic from '../../assets/icons/uploadMusic.png';
  // import uploadImage from '../../assets/icons/uploadImage.png'
  import uploadart from '../../assets/uploadart.PNG'
  import uploadmusic from '../../assets/uploadmusic.PNG'
  
  


  const customStyles = {
    content: {
      top: "16%",
      left: "65%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "14%",
      background:'#6C9CA6',
      border:'2px solid white',
      padding:'8px',
      transform: "translate(-50%, -50%)",
      zIndex:4
    },
  };
  
  const UPloadArtAndMusic = ({ ModalIsOpen, closeModal }) => {
  
    const [fileUploadOpen, setfileUploadOpen] = useState(false)
    const [MusicFileUploadOpen, setMusicFileUploadOpen] = useState(false)
  
  
    const fileuploadScreen = () => {
        closeModal()
      setfileUploadOpen(!fileUploadOpen)
    }
  
    const MusicfileuploadScreen = () => {
        closeModal()
      setMusicFileUploadOpen(!MusicFileUploadOpen)
    }
  
  

  
  
  
    return (
      <Box sx={{ width: "800px" ,}}>
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
      
        >
          {/* <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={closeModal} aria-label="delete">
                <CloseIcon sx={{ color: "#000" }} />
              </IconButton>
            </Box>
            <div className="row justify-content-end" >
                <h4 className='' style={{ color: '#709CA6' }}>
                  Upload
                </h4>
                <hr />
              </div>
              <div className="row align-items-center justify-content-between text-dark my-2 px-5">
                <div className="col-5 p-4 border border-dark" type="button"  onClick={fileuploadScreen} style={{ cursor: 'pointer' }}>
                  <div className=" p-2 d-flex justify-content-center">

                    <img src={uploadImage} alt="" className="img-fluid"  style={{ width: '150px' }} />

                  </div>
                  <div className="d-flex justify-content-center mt-2 d-flex align-items-center">
                    <h3 className='' style={{ fontWeight: '700', fontSize: '14px' }}>
                      Upload Art
                    </h3>
                  </div>
                </div>

                <div type="button" className="col-5 mt-1 p-4  border border-dark"  onClick={MusicfileuploadScreen}  style={{ cursor: 'pointer' }}>
                  <div className="d-flex justify-content-center">

                    <img src={uploadMusic} alt="" className="img-fluid" style={{ width: '150px' }} />
                  </div>
                  <div className=" mt-2 d-flex justify-content-center align-items-center">
                    <h3 className='' style={{ fontWeight: '700', fontSize: '14px' }}>
                      Upload Music
                    </h3>
                  </div>
                </div>
              </div>

          
          </Box> */}

           <div className="container">
            <div onClick={fileuploadScreen}>
              <div  className="d-flex align-items-center justify-content-center" type="button" style={{cursor:'pointer'}} >
           <img src={uploadart} alt="" className="img-fluid mx-1" style={{height:'25px',width:'25px',background:'#cbb9c4',color:'white'}}/>
             <h6 className="text-white pb-0 mb-0">Upload Images</h6> 
              </div>
        
            </div>
            <div className="div" onClick={MusicfileuploadScreen}>
              <div className="d-flex align-items-center justify-content-center mt-2" style={{cursor:'pointer'}}>
             <img src={uploadmusic} alt="" className="img-fluid me-1" style={{height:'25px',width:'25px',background:'#cbb9c4',color:'white'}}/>
            <h6 className="text-white pb-0 mb-0">Upload Music</h6>  
            </div> 
            </div>
           
           </div>
        </Modal>





        {MusicFileUploadOpen && (
        <div className="modalForfileUploadOpen ">
          <div className="modal-contentForfileUploadOpen">
            <UploadFile closeWindow={MusicfileuploadScreen} />
          </div>
        </div>



      )}



      {fileUploadOpen && (
        <div className="modalForfileUploadOpen ">
          <div className="modal-contentForfileUploadOpen">

            <UserUploadArtFile closeWindow={fileuploadScreen} />

          </div>
        </div>



      )}



      </Box>
    );
  };
  
  export default UPloadArtAndMusic;