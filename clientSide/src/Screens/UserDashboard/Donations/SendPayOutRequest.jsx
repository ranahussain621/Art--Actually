
import { Box,IconButton,} from "@mui/material";
  import React from "react";
  import Modal from "react-modal";
  import CloseIcon from "@mui/icons-material/Close";
  import {useDispatch } from "react-redux";


  import {toast} from "react-toastify";
import { SendPayoutAmount, getAllPayments } from "../../../redux/features/auth/PaymentSlice";


  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "40%",
      zIndex:'1',
      transform: "translate(-50%, -50%)",
    },
  };
  
  const SendPayOutRequest = ({ ModalIsOpen, closeModal,price }) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const userId =user?.user[0]?._id;

let payoutPrice = Number(price)
  const dispatch = useDispatch();
   
  const setRequest = async()=>{
    dispatch (SendPayoutAmount({user_id:userId, payment:payoutPrice
  }))
  .then((res)=>{
    if(res.payload.success===false){
toast.error(res.payload.message,{autoClose:1000})
    }
    else{
      toast.success(res.payload.message,{autoClose:1000})
      dispatch( getAllPayments({artist_id:userId, role:"artist" })) 
      closeModal()
    }
 
  })

  }
  
  
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
 

    <div className="w-100 text-center">
        <p className="openSans-600 fs-4" style={{color:'#709AA4'}}>Pay Out Request</p>
    </div>
    <div className="row my-5">
        <div className="col-1"></div>
              <div className="col">
                <label htmlFor="payoutinput" className="fw-semibold fs-5"> Payout Amount</label></div>
              <div className="col-6 ">
                <input id="payoutinput" 
                type="number" 
                className="w-100 form-control" 
                placeholder="$"
                value={price}
                readOnly
                />
              </div>
              <div className="col-2"></div>
    </div>
    <div className="w-100 text-end">
        <button type="button"
         className="btn " 
         style={{backgroundColor:'#709AA4', color:'white'}} 
        disabled={payoutPrice===0}
         onClick={setRequest} >Send Request</button>
    </div>
  </Box>
            
          </Box>
        </Modal>
      </Box>
    );
  };
  
  export default SendPayOutRequest;
  