

import {
    Box,
    IconButton,
    Typography,
    Button,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import Modal from "react-modal";
import NewSingUp from "./NewSingUp";
import NewResetPassword from "./NewResetPassword";
import NewLogin from "./NewLogin";
import { Stepper } from "../../Components/stepperForSignup/Stepper";

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
    //   width: "998px",
      transform: "translate(-50%, -50%)",
      padding:'0px',
    overflow:'hidden',
    borderRadius:'20px'
    
      
    },
  };
  
  const ModalHandler = ({ ModalIsOpen, closeModal,
    screenshift,restscreenminus,
    interestscreenminus,interestscreenplus,
    restscreenplus,shiftCountminus,shiftCountplus }) => {


  



  
    return (
      <Box >
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Box >
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
                <button onClick={closeModal}>close</button>
              <IconButton onClick={closeModal} aria-label="delete">
                <CloseIcon sx={{ color: `${theme==='light'? '#000':'white'}` }} />
              </IconButton>
            </Box> */}
  {
    screenshift===1?
     (


<NewLogin signupscreenPlus ={shiftCountplus}  Restpasswordscreenplus={restscreenplus} closeModal={closeModal} />
    )
    :
    screenshift===2 ?
    (
<NewSingUp screenPlus ={shiftCountplus}  screenMinu={shiftCountminus} closeModal={closeModal} steppershow={interestscreenplus}/>
    )
    : screenshift===3 ?
    (
<NewResetPassword screenMinu={restscreenminus}  closeModal={closeModal}/>
    )
    :screenshift===4 ?
    (
<Stepper closeModal={closeModal} screenMinu={shiftCountminus} />
    )
    :
    ('')
  }
          
          </Box>
        </Modal>

        {/* <NewSingUp 
       closeModal={signupModalScreen}
       ModalIsOpen={signupModal}
       closeLogin={closeModal
    }
      /> */}
      </Box>
    );
  };
  
  export default ModalHandler;
  