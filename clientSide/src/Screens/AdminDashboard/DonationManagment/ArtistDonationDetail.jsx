

import { Box, IconButton,} from "@mui/material";
  import React from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
import SingleArtistDonations from "./SingleArtistDonations";
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90%",
      zIndex:'1',
      transform: "translate(-50%, -50%)",
    },
  };
  
  const ArtistDonationDetail = ({ ModalIsOpen, closeModal,recordId }) => {
  
  
  
    return (
      <Box sx={{ width: "90%" }}>
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton onClick={closeModal} aria-label="delete">
                <CloseIcon sx={{ color: "#0000009e" }} />
              </IconButton>
            </Box>
  <Box>
  

     <div className="card  border-0">

<div className='card-body d-flex justify-content-center'>
    <div className='w-100'>
   
   <SingleArtistDonations recordId={recordId}/>
      
        </div>
        </div>
    </div>
  </Box>
            
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default ArtistDonationDetail;
  