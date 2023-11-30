
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

import { DeleteEvents, GetAllEvents } from "../../../redux/features/EventSlice";
  
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
  
  const DeleteEvent = ({ ModalIsOpen, closeModal,ID }) => {
  
  
  const dispatch = useDispatch();
   
  
  
  
  
  
  
    
  
  const deleteDoc = ()=>{
  dispatch(DeleteEvents(ID))
  .then((res)=>{
    if(res.payload)  
       dispatch(GetAllEvents())
     toast.success(res.payload.message,{autoClose:1000})
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
                Delete Exibition
              </Typography>
  
              <Typography  
              className="text-center mt-3 text-muted"
              sx={{ fontWeight: "300", color: "#000" }}>
              Are you sure to Delete this exibition ?
              </Typography>
              <Box
              variant='div'
              className='text-end'
              >
  <Button variant="contained" 
  style={{backgroundColor:"#709AA4"}}
  onClick={ deleteDoc}>Delete</Button>
              </Box>
  
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default DeleteEvent;
  