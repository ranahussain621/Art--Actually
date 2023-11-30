import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addUserArt,getAllArts,getAllSound } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const UploadArtDetail = (props) => {
  
    

  const { userList } = useSelector((state) => state.auth);
 

 

  const User = JSON.parse(localStorage.getItem("user"));
  const user_id = User?.user[0]._id;

  const [addArt, setAddArt] = useState({
    title: "",
    description: "",
    format:'', 
    style:'',
    user_id: user_id,
    image:props?.selectedFile
  });

  const [uploadedArtCount, setUploadedArtCount] = useState(0);

  

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onchange = (e) => {
    const { name, value } = e.target;
    setAddArt({ ...addArt, [name]: value });
  };



  useEffect(()=>{
    const getData = async () => {
       await dispatch(getAllArts())
    }
    getData()
  },[dispatch])


  useEffect(() => {
    if (userList?.arts?.formates && userList?.arts?.formates?.length > 0) {
      setAddArt((prev) => ({
        ...prev,
        format: userList.arts.formates[0]._id,
      }));
    }

    if (userList?.arts?.styles && userList?.arts?.styles?.length > 0) {
      setAddArt((prev) => ({
        ...prev,
        style: userList.arts.styles[0]._id,
      }));
    }
  }, [userList]);

 

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      title: "",
      description: "",
    };

    if (addArt.title.trim() === "") {
      updatedErrors.title = "Title is required";
      isValid = false;
    }

    if (addArt.description.trim() === "") {
      updatedErrors.description = "Description is required";
      isValid = false;
    }

   
  

    setErrors(updatedErrors);
    return isValid;
  };

  const addArtUser = async () => {
    if (!props.selectedFile) {
      return;
    }

    if (!validateForm()) {
      return;
    }

 
  if(validateForm()){

    let formData = new FormData();
    formData.append('title', addArt?.title);
    formData.append('description', addArt?.description);
    formData.append('format', addArt?.format);
    formData.append('style', addArt?.style);
    formData.append('user_id', addArt?.user_id);
   
    formData.append('image',addArt?.image)
   
    setUploadedArtCount(uploadedArtCount + 1);
    await dispatch(addUserArt(formData))
      .then(async () => {


        // if (uploadedArtCount >= 3) {
          if(User?.user[0].vip === 'false' && User.user[0].payment === 'false'){
             toast.error('Please Upgrade Membership',{
              autoClose:3000
            })
            
            navigate('/payment-plans')
          }
            
          // }
           
        
        
        if(User?.user[0].vip === 'true' && User.user[0].payment === 'true'){
        toast.success('Art Added Successfully',{
          autoClose:1000
        })
      }

        props.close()
       
        await dispatch(getAllArts())
        await dispatch(getAllSound())
        
      })
  

      
  };
}

  return (
    <>
      <div className="detail-title mt-3" style={{}}>
       
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group my-2">
          <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
          }}
        >
          Title
        </p>
            <input
              type="text"
              onChange={onchange}
              value={addArt.title}
              className={`form-control ${errors.title && "is-invalid"}`}
              name="title"
              class="form-control"
              placeholder="title"
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="form-group my-3">
          <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
          }}
        >
          Description
        </p>
            <textarea
              className={`form-control ${errors.description && "is-invalid"}`}
              onChange={onchange}
              value={addArt.description}
              name="description"
              placeholder="Description"
              rows="6"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
        </div>

        <div className="col d-flex align-items-center">
          <div className="image d-flex justify-content-center align-items-center">
            <img
              src={props.selectedFile ?
            
                URL.createObjectURL(props.selectedFile):
                ''
              }
              className="rounded-circle"
              style={{ maxWidth: "250px",height:'250px' }}
              alt=""
            />
          </div>
         
        </div>
      </div>
      <div className="row">
        <div className="col py-0">
          <label htmlFor="" className="fs-5" style={{color:"rgb(116, 168, 176)"}}>Select Format</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={addArt.format}
    onChange={onchange}
    name="format"
    >
    {
        userList?.arts?.formates?.map((formates,i)=>{
            return (
                <option key={i} value={formates._id}>{formates.title}</option>
            )
        })
      }
      </select>
        </div>
        <div className="col">
        <label htmlFor="" className="fs-5" style={{color:"rgb(116, 168, 176)"}}>Select Style</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={addArt.style}
    onChange={onchange}
    name="style"
    >
    {
        userList?.arts?.styles?.map((style,i)=>{
          
            return (
                <option key={i} value={style._id}>{style.title}</option>
            )
        })
      }
      </select>
        </div>
      </div>
      <div className="d-flex justify-content-end  text-end mt-3 border-top">
        <div className=" pt-2">
          <button
            className="btn text-white"
            onClick={addArtUser}
            style={{ backgroundColor: "#74A8B0" }}
          >
            Publish
          </button>
        </div>
      </div>
     
    </>
  );
};

export default UploadArtDetail;
