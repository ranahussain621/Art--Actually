
import {
    Box,
    IconButton,
    Typography,
    Button,
  } from "@mui/material";
  import React from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch } from "react-redux";
  import {toast} from "react-toastify";
import { ArtistCancelSubscriptonRequestApi } from "../../../redux/features/auth/authSlice";
  
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
  
  const ArtistCancelSubscriptionRequest = ({ ModalIsOpen, closeModal,ID }) => {
  
  
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user?.user[0]?._id
    const userEmail = user?.user[0]?.email
    const firstName = user?.user[0]?.firstName 
    const lastName =  user?.user[0]?.lastName
  const dispatch = useDispatch();
   
  
  
  
  
  
  
    
  
  const deleteDoc = ()=>{
  dispatch(ArtistCancelSubscriptonRequestApi({
    firstName:firstName,
    lastName:lastName,
    email:userEmail
  }))
  .then((res)=>{
    if(res.payload.success===true)  
      
     toast.success("request send Successfully",{autoClose:1000})
    closeModal()
  })
   
  
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
              Cancel Subcription
              </Typography>
  
              <Typography  
              className="text-center mt-3 text-muted"
              sx={{ fontWeight: "300", color: "#000" }}>
             Are you sure you want to Cancel your Subscription?
              </Typography>
              <Box
              variant='div'
              className='text-end'
              >
  <Button variant="contained" 
  style={{backgroundColor:"#709AA4"}}
  onClick={ deleteDoc}>Confirm</Button>
              </Box>
  
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default ArtistCancelSubscriptionRequest;
  