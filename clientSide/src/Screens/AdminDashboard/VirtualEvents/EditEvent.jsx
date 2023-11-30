
import React, { useEffect, useState } from "react";
import Modal from "react-modal";


import { Box, IconButton,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux'
import { AddEvent, EditEvents, EventDetail, GetAllEvents } from "../../../redux/features/EventSlice";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: '15px',
    boxShadow: '5px 5px 5px 5px #00000052',
    width: "60%",
   
    transform: "translate(-50%, -50%)",
  },
};



const EditEvent = ({ closeModal, ModalIsOpen,ID }) => {

  const [detail, setdetail] = useState({
    name: "",
    description: "",
    url:'', 
    location:'',
    exhibitionId:'',
    startDate:'',
    endDate:'',
    image:'',
    user_id:''
  });



  const dispatch = useDispatch()

  //get initial values of detail
  useEffect(() => {
    const getValue =async()=>{
      const val = await  dispatch(EventDetail({exhibitionId:ID}))
      const data = val.payload?.data
      
      if(data){
        setdetail((prev=>({
            ...prev,
            name: data[0]?.name,
            description: data[0]?.description,
            url:data[0]?.url, 
            location:data[0]?.location,
            exhibitionId:ID,
            startDate:data[0]?.startDate,
            endDate:data[0]?.endDate,
            image:data[0]?.image,
            user_id:data[0]?.user_id
        })))
      }
      
    }
    getValue()
  }, [ID])
  
  
  const handleFileChange = (e) => {
    const file  = e.target.files[0];

    
    if (file) {
      const img = new Image();
  
      img.onload = function () {
        if (img.width >= 1660 && img.height >= 560) {
          toast.success("image uploaded",{autoClose:1000})
          setdetail((prev) => ({
            ...prev,
            image: file,
          }));
        } else {
          toast.error("Minimum image size is 1660px x 560px",{autoClose:1000});
        }
      };
      
      img.onerror = function () {
        toast.error("Error loading the image",{autoClose:1000});
      };
      
      // Load the image source after setting up the callbacks
      img.src = URL.createObjectURL(file);
    } else {

      console.error(`some thing wrong Please try later`);

    }
  };


  const onchange = (e) => {
    const { name, value } = e.target;
    setdetail((prev)=>(
      { ...prev,
         [name]: value
         }));
  };
 

  const submitData =async()=>{

    const formData = new FormData()
    for (const key in detail) {
      
          formData.append(key, detail[key]);
      
      }
await dispatch(EditEvents(formData))

.then((res)=>{
  if(res.payload.success===true){

    toast.success(res?.payload?.message,{autoClose:1000})
    dispatch(GetAllEvents())
    closeModal()

  }else{
toast.error("someThing wrong please try later",{autoClose:1000})
  }

})
  }
  return (
    <>
      <Box className="virtualevent">
        <Modal
          isOpen={ModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Box sx={{ padding: "20px" }} >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

              }}
            >
              <div className="w-100">
                
              </div>
              <div className="d-flex justify-content-end w-100">
                <IconButton onClick={closeModal} aria-label="delete" style={{ border: '2px solid #709AA4' }} className="rounded-4">
                  <CloseIcon sx={{ color: "#0000009e" }} />
                </IconButton>
              </div>

            </Box>
           

            <div className="container-fluid ">
        <div className="p-md-4 p-sm-2 p-1">
            <div className="row openSans-500" style={{color:'#CACED8',fontWeight:'500'}}>
                <div className="col-md-9 col-lg-9 col-sm-4 fs-3 " >Edit Event</div>
                <div className="col-md-3 col-lg-3 col-sm-4 fs-6 text-end">Last Update June 1</div>
            </div>
            <div className="row my-4 openSans-500" style={{fontWeight:'500'}}>
                <label htmlFor="" className='fs-5 ' style={{color:'#083A50'}}>Exibition Name</label>
                <input type="text" className='rounded-3 p-2 mt-1' 
               onChange={onchange}
               value={detail?.name}
                style={{border:'1px solid #CACED8',outline: 'none',}} 
                name="name"
               
                placeholder='Name of Trade show / conference' />
            </div>



            <div className="row openSans-500" style={{fontWeight:'500'}}>
               
                <div className="row p-0 m-0">

                  <div className="col m-0 p-0 pe-2"> 
                  <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Exibition Start Date</label>
                  <input type="date" className='rounded-3 p-2 mt-1 w-100' 
            value={detail?.startDate}
               style={{
                border: '1px solid #CACED8',
                outline: 'none',
                '::placeholder': {
                  color: '#CACED8', // Specify the color you want for the placeholder text
                },
              }}
              
              onChange={onchange}
               name="startDate" 
                />
                  </div>
                 
                  <div className="col m-0 p-0"> 
                  <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Exibition End Date</label>
                  <input type="date" className='rounded-3 p-2 mt-1 w-100' 
               value={detail?.endDate}
               style={{
                border: '1px solid #CACED8',
                outline: 'none',
                '::placeholder': {
                  color: '#CACED8', // Specify the color you want for the placeholder text
                },
              }}
              onChange={onchange}
               name="endDate" 
                />
                  </div>
                </div>
               
            </div>
         



            <div className="row my-4 openSans-500" style={{fontWeight:'500'}}>
                <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Event Description</label>
                <input type="text" className='rounded-3 p-2 mt-1' 
               placeholder='Add Description'
               value={detail?.description}
               style={{
                border: '1px solid #CACED8',
                outline: 'none',
                '::placeholder': {
                  color: '#CACED8', // Specify the color you want for the placeholder text
                },
              }}
              onChange={onchange}
               name="description" 
                />
            </div>



            <div className="row my-4 openSans-500" style={{fontWeight:'500'}}>
                <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Exhibition URL:</label>
                <input type="text" className='rounded-3 p-2 mt-1' 
               placeholder='Place exhibition Url'
               value={detail?.url}
               style={{
                border: '1px solid #CACED8',
                outline: 'none',
                '::placeholder': {
                  color: '#CACED8', // Specify the color you want for the placeholder text
                },
              }}
              onChange={onchange}
               name="url"  />
            </div>

            <div className="row my-4 openSans-500" style={{fontWeight:'500'}}>
                <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Exhibition Location:</label>
                <input type="text" className='rounded-3 p-2 mt-1' 
               placeholder='Place exhibition Location'
               value={detail?.location}
               style={{
                border: '1px solid #CACED8',
                outline: 'none',
                '::placeholder': {
                  color: '#CACED8', // Specify the color you want for the placeholder text
                },
              }}
              onChange={onchange}
               name="location"  />
            </div>



            <div className="row my-4 openSans-500" style={{fontWeight:'500'}}>
                <label htmlFor="" className='fs-5' style={{color:'#083A50'}}>Edit Image</label>
                <div className="p-4 rounded-3 d-flex"
                 style={{
                  border:'2px dotted #a69f9f',
                  background:'#fff1f1f2'
                }}
                 >
<div>
   <input type="file" id="myFileInput" className="hidden" style={{display:"none"}} 
      onChange={(e)=>handleFileChange(e)}
      />
      <label style={{display:"inline-block"}} htmlFor="myFileInput" className="file-input-button btn btn-outline-dark rounded-2 shadow">
      + edit Image
      </label>
</div>
<div className="d-flex justify-content-center align-items-center">
  <p  className="m-0 px-3">{detail?.image}</p>
<p className="m-0 px-3">1660px  x 560px</p>
</div>

      

   
      </div>

           </div>
        

            <div className="col-md-12 mt-4">
                <button className='btn px-4' 
                onClick={submitData}
                style={{fontWeight:'500',color:"#fff",background:'#709AA4'}}>Submit</button>
            </div>
        </div>
    </div>

          </Box>
        </Modal>

        
      </Box>

    </>
  );
};

export default EditEvent;
