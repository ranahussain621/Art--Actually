
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";


import { Box, IconButton,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux'
import { getBlogCatagaries } from "../../../redux/features/auth/authSlice";
import { EditBlogApi, ListOfBlogs } from "../../../redux/features/auth/PaymentSlice";
import { toast } from "react-toastify";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import uploadBlog from '../../../assets/icons/uploadblog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from "../../../redux/axios/axios";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: '15px',
    boxShadow: '5px 5px 5px 5px #00000052',
    width: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const UpdateBlog = ({ ID, closeModal, ModalIsOpen }) => {

      const user = JSON.parse(localStorage.getItem('user'))
      const Id = user.user[0]._id

  const { blogList, isLoading } = useSelector((state) => state.payment)
  const dispatch = useDispatch()

  const [catagaryList, setcatagaryList] = useState()
  const [userImage, setuserImage] = useState()
 
  const [sendData, setsendData] = useState({
    id:'',
    category: [],
    title: '',
    description: '',
    image:null,
    user_id:Id
  })


  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };




  useEffect(() => {
    const getData =async()=>{
   await dispatch(ListOfBlogs({ id: ID }))
  
    }
    getData()
    
  }, [ID,dispatch])

  useEffect(() => {
    if (blogList?.data) {
      setsendData(prev => ({
        ...prev,
        title: blogList?.data[0]?.title,
        description: blogList?.data[0]?.description,
        image:blogList?.data[0]?.image,
        id:ID
      }))
    }
  }, [blogList?.data,ID])


  //close modal and get all blog list
  const closemodalfun = async () => {
    dispatch(ListOfBlogs({}))
    closeModal()
  }



  useEffect(() => {
    const getdata = async () => {
      const val = await dispatch(getBlogCatagaries())
      const data = val.payload?.data

      setcatagaryList(data)
    }
    getdata()

  }, [dispatch])



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setsendData((prev) => ({
      ...prev,
      category: typeof value === 'string' ? value.split(',') : value
    }));
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.length > 0) {
      setuserImage(files[0])
      setsendData((Prev) => ({
        ...Prev,
        [name]: files[0]
      }));
    } else {

      console.error(`No files found for input with name '${name}'`);

    }
  };

  //add data 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setsendData((prevState) => ({
      ...prevState,
      [name]: value,
    }));


  };


  const addBlogData = async () => {
    const formData = new FormData()

    for (const key in sendData) {
      if (sendData.hasOwnProperty(key)) {
        if (key === "category") {
          for (let i = 0; i < sendData.category.length; i++) {
            formData.append(`category[${i}]`, sendData.category[i]);
          }
        } else if (key === "image") {
          formData.append(key, sendData.image);
        } else {
          formData.append(key, sendData[key]);
        }
      }
    }


    dispatch(EditBlogApi(formData))
      .then((res) => {
        if (res.payload.success === true) {
          toast.success(res.payload.message, { autoClose: 1000 })
          dispatch(ListOfBlogs({}))
          closeModal()
          setsendData({
            category: [],
            title: '',
            description: '',
          })
        }
      })
  }



  return (
    <>
      <Box >
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

              }}
            >
              <div className="w-100">
                <h3 className="m-0 w-100 openSans-600" style={{ letterSpacing: "0.9", color: '#709AA4', fontSize: "30px" }}>Edit Blog</h3>
              </div>
              <div className="d-flex justify-content-end w-100">
                <IconButton onClick={closemodalfun} aria-label="delete" style={{ border: '2px solid #709AA4' }} className="rounded-4">
                  <CloseIcon sx={{ color: "#0000009e" }} />
                </IconButton>
              </div>

            </Box>
            <hr />

            {isLoading ? (<h5 className="text-center openSans-400">
              Loading...
            </h5>) :
              <div className="card-body" style={{ padding: "15px 15px" }}>

                <div className="row mt-4 d-flex align-items-center">
                  <div className="col">  <div className="form-group my-2">
                    <p
                      className="openSans-600 h4"
                      style={{
                        color: "#74A8B0",
                        textTransform:"capitalize"
                      }}
                    >
                      Title
                    </p>
                    <input
                      type="text"
                      name="title"
                      onChange={handleInputChange}
                      value={sendData?.title}
                      class="form-control"
                      style={{ width: "100%" ,textTransform:"capitalize"}}

                    />
                  </div>
                    <div className="form-group my-2">

                    <p
                      className="openSans-600 h4 "
                      style={{
                        color: "#74A8B0",
                      }}
                    >
                      Choose categories
                    </p>
                      <div className="d-flex">
                    
                      </div>





                      <FormControl sx={{  width: '100%' }}>
                       
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={sendData?.category}
                          onChange={handleChange}
                          input={<OutlinedInput label="Category" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          sx={{
                            '& .MuiSelect-select': {
                              padding: 1,
                            },
                          }}
                        >
                          {catagaryList?.map((item, i) => (
                            <MenuItem key={item._id} value={item._id} style={{textTransform:"capitalize"}}>
                              <Checkbox checked={sendData?.category?.indexOf(item.title) > -1} />
                              <ListItemText primary={item.title} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>




                    </div>
                    <div className="form-group my-3">
                      <p
                        className="openSans-600 h4"
                        style={{
                          color: "#74A8B0",

                        }}
                      >
                        Description
                      </p>
                      <textarea className="form-control rounded-3 ps-3 py-2  text-muted"
                        style={{ width: "100%" ,textTransform:"capitalize"}}
                        name="description"
                        value={sendData?.description}
                        onChange={handleInputChange}
                        rows={8}
                      >

                      </textarea>

                    </div>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <div className="my-2">

                      {/* <input type="file" name="image" id="" onChange={handleFileChange} /> */}
                      <div className="d-flex justify-content-center mb-md-5 mb-sm-2 m-0">
                        <div className="profile-image-container mt-4">
                          <input
                            className=''
                            type="file"
                            name="image"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*"
                          />

                          <div className="avatar d-flex align-items-end" onClick={handleAvatarClick}>
                            <img
                              src={
                                sendData?.image && !userImage ? sendData?.image[0] :
                                  userImage ? URL.createObjectURL(userImage) :
                                    !userImage && !sendData?.image ? uploadBlog : ''
                              }
                              className=" img-fluid  "
                              style={{ position: 'relative', width: '334px', height: '335px' }}
                              alt="Avatar"
                            />
                            <div className="rounded-circle d-flex justify-content-center align-items-center "
                              style={{
                                background: '#74A8B0',
                                position: 'relative',
                                width: '50px',
                                height: '50px',
                                right: '20px',
                                top: '10px'
                              }}>
                              <FontAwesomeIcon icon={faCamera} className="camera-icon " style={{ color: "white" }} />

                            </div>

                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>



                <div className="mt-5 w-100 text-end">
                  <button className="btn btn-sm px-4" style={{ background: 'rgb(113, 157, 168)', color: 'white' }} onClick={()=>addBlogData()}>Update</button>
                </div>


              </div>
            }


          </Box>
        </Modal>
      </Box>

    </>
  );
};

export default UpdateBlog;
