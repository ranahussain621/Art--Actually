  import React from "react";
  import Modal from "react-modal";
  
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

 
 



  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      minWidth:'800px',
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  
  const Logout = ({ModalIsOpen, closeModal }) => {

    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.clear()
        toast.success('Logged out', {
          autoClose: 1000,
          });
        navigate('/')
      }




   







    return (
      <div >
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={{ overlay: { zIndex: 9999 }, content: customStyles.content }}
          contentLabel="Example Modal"
        >
          <div style={{ padding: "0px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
             <button type="button" class="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
  
            <div>
              <p
              className="text-center h3"
              style={{ fontWeight: "600", color: "rgb(112, 155, 165)" }}>
                Logout
              </p>

              <p  
              className="text-center my-3"
              style={{ fontWeight: "500", color: "rgb(112, 155, 165)" }}>
              Are you sure, you want Logout ?
              </p>
              <div
              
              className='text-end'
              >
<button className="btn text-white" style={{background:"rgb(112, 155, 165)"}} onClick={logout} >Logout</button>
              </div>
  
              </div>
          </div>
        </Modal>
        </div>
    );
  };
  
  export default Logout;
  