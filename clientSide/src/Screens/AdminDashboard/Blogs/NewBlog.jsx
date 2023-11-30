
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";


import {
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from 'react-redux'
import { getBlogCatagaries } from "../../../redux/features/auth/authSlice";
import { AddBlog, ListOfBlogs } from "../../../redux/features/auth/PaymentSlice";
import { toast } from "react-toastify";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import uploadBlog from '../../../assets/icons/uploadblog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faShareNodes } from '@fortawesome/free-solid-svg-icons';

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


const NewBlog = ({ closeModal, ModalIsOpen }) => {


  const dispatch = useDispatch()

  const [catagaryList, setcatagaryList] = useState()
  const [userImage, setuserImage] = useState()
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user[0]?._id
  const [sendData, setsendData] = useState({
    user_id: userId,
    category: []


  })


  const fileInputRef = useRef(null);

  // Function to handle avatar click and trigger file input
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setsendData((prev) => ({
      ...prev,
      category: typeof value === 'string' ? value.split(',') : value
    }));
  };




  useEffect(() => {
    const getdata = async () => {
      const val = await dispatch(getBlogCatagaries())
      const data = val.payload?.data

      setcatagaryList(data)
    }
    getdata()

  }, [])



  const handleFileChange = (e) => {
    const file  = e.target.files[0];

    // Check if 'files' is defined and it's an array
    if (file ) {
      setuserImage(file)
      setsendData((Prev) => ({
        ...Prev,
        image: file
      }));
    } else {

      console.error(`No files found for input with name `);

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


  //send data to backend to add blog in formData
  const addBlogData = async () => {
    const formData = new FormData()
    for (const key in sendData) {
      if (sendData.hasOwnProperty(key)) {
        if (key === "category") {
          for (let i = 0; i < sendData?.category?.length; i++) {
            formData.append(`category[${i}]`, sendData.category[i]); // Append each category value individually
          }
        } else {
          formData.append(key, sendData[key]);
        }
      }
    }

    dispatch(AddBlog(formData))
      .then((res) => {
        if (res.payload.success === true) {
          toast.success(res.payload.message, { autoClose: 1000 })
          dispatch(ListOfBlogs({}))
          closeModal()
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
                <h3 className="m-0 w-100 openSans-600" style={{ letterSpacing: "0.9", color: '#709AA4', fontSize: "30px" }}>Add New Blog</h3>
              </div>
              <div className="d-flex justify-content-end w-100">
                <IconButton onClick={closeModal} aria-label="delete" style={{ border: '2px solid #709AA4' }} className="rounded-4">
                  <CloseIcon sx={{ color: "#0000009e" }} />
                </IconButton>
              </div>

            </Box>
            <hr />

            <div className="card-body" style={{ padding: "15px 15px" }}>
              <div className="row mt-4">
                <div className="col">
                  <div className="form-group my-2">
                    <p
                      className="openSans-600 h4"
                      style={{
                        color: "#74A8B0",
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
                      style={{ width: "100%" }}

                    />
                  </div>
                  <div className="form-group my-3">
                    <p
                      className="openSans-600 h4 "
                      style={{
                        color: "#74A8B0",
                      }}
                    >
                      Choose categories
                    </p>


                    <FormControl sx={{ width: '100%' }} >
                      {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        // id="demo-multiple-checkbox"
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
                          <MenuItem key={item._id} value={item._id} >
                            <Checkbox checked={sendData?.category.indexOf(item.title) > -1} />
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
                      style={{ width: "100%" }}
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
                    <div className="profile-image-container">
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
                            !userImage ? uploadBlog :
                              userImage ? URL.createObjectURL(userImage) :
                                ''
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
                <button className="btn " style={{ background: '#74A8B0', color: 'white' }} onClick={addBlogData}>Submit</button>
              </div>

            </div>

          </Box>
        </Modal>
      </Box>

    </>
  );
};

export default NewBlog;
