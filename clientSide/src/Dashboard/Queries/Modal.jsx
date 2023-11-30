import React, { useState,useEffect } from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch} from 'react-redux'
import { getQueryDetails } from '../../redux/features/auth/authSlice';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "800px",
    transform: "translate(-50%, -50%)",
  },
};


const Note = ({id,closeModal,ModalIsOpen}) => {
 
    const [queryDetails,setQueryDetails] = useState()

  const dispatch = useDispatch()


  useEffect(()=>{
    const getQueries = async() =>{
     const data = await dispatch(getQueryDetails({id:id}))
    
     setQueryDetails(data?.payload?.data)
    }
    getQueries()
   },[id,dispatch])


  return (
    <>
     <Box>
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
   <div
        className="detail-title p-2 d-flex align-items-center container"
        style={{ borderBottom: "1px solid grey" }}
      >
        <h3 className="m-0 w-100 openSans-400" style={{letterSpacing:"0.9",color:'#709AA4', fontSize:"30px"}}>Query Detail</h3>
       
      </div>
      <div className="card-body" style={{ padding: "15px 15px" }}>
        <div className="form-group my-2">
          <p
            className="openSans-400 h5"
            style={{
              color: "#74A8B0",
            }}
          >
            Name
          </p>
          <input
            type="text"
            name="title"
            class=" border-0 py-3 px-1"
            style={{ width:"100%",textTransform:"capitalize"}}
            placeholder={queryDetails?.name}
            readOnly
            disabled
          />
        </div>
        <div className="form-group my-2">
          <p
            className="openSans-400 h5 "
            style={{
              color: "#74A8B0",
            }}
          >
          Email
          </p>
          <input
            type="text"
            name="title"
            class=" border-0 py-3 px-1"
            style={{ width:"100%"}}
            placeholder={queryDetails?.email}
            readOnly
            disabled
       
          />
        </div>
        <div className="form-group my-3">
          <p
            className="openSans-400 h5"
            style={{
              color: "#74A8B0",
            }}
          >
           Query
          </p>
          <textarea className="border rounded-3 ps-2 py-2 border-0 text-muted"
            style={{ width:"100%" ,textTransform:"capitalize"}}
            placeholder={queryDetails?.query}
            readOnly
            disabled
            rows={4}
          >
    
          </textarea>
          
        </div>

       
      </div>

</Box>
</Modal>
            </Box>
   
    </>
  );
};

export default Note;
