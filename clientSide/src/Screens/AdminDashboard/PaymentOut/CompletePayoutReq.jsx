

import {Box, IconButton,Typography,Button,} from "@mui/material";
  import React, { useRef, useState } from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch } from "react-redux";
import dummyReceipt from '../../../assets/images/payments/dummy_receipt.png'
  import {toast} from "react-toastify";
import { AllPayoutRequestList, UploadReceipt } from "../../../redux/features/auth/PaymentSlice";
import { baseURL } from "../../../redux/axios/axios";
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "900px",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const CompletePayoutReq = ({ ModalIsOpen, closeModal,request_id,user_id,receipt }) => {


    const [userImage, setuserImage] = useState();
    const fileInputRef = useRef(null);
  const dispatch = useDispatch();
   
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Handle the selected file here, e.g., upload it to the server or display it
    setuserImage(selectedFile);
  };
  
  
  
  
  
    
  
  const UploadDoc = ()=>{
    if(userImage){
        const formdata =new FormData()
        formdata.append("user_id",user_id)
        formdata.append("file",userImage)
        formdata.append("request_id",request_id)
    
   dispatch(UploadReceipt(formdata))
   .then(()=>{
     
   toast.success("paid successfully",{autoClose:1000})
   dispatch(AllPayoutRequestList())
   }
  
 )
}
  }
  
  
  
    return (
      <Box sx={{ width: "800px" }}>
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
              <Typography variant="h4" 
              className="text-center"
              sx={{ fontWeight: "600", color: "#709AA4" }}>
              Upload Receipt
              </Typography>
  
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
                className="d-flex justify-content-center"
              >
                <img
                  src={
                     !userImage && receipt
                      ?  receipt[0]
                      : userImage 
                      ? URL.createObjectURL(userImage) // Display the uploaded image if available
                     : !receipt && !userImage
                    ? dummyReceipt
                      : "" // Otherwise, display the default Avatar
                  }
                  alt="no img"
                  style={{
                    cursor: "pointer",
                    width: "250px",
                   
                  
                  }}
                  onClick={handleUploadClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <Box
              variant='div'
              className='text-end'
              >
  <Button variant="contained" 
  style={{backgroundColor:"#709AA4"}}
  disabled={receipt}
  onClick={()=>{
  closeModal()
  UploadDoc()
  
  }}>Upload File</Button>
              </Box>
  
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default CompletePayoutReq;
  
