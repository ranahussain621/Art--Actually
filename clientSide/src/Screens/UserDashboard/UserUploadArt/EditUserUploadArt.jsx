import React,{useEffect, useRef, useState} from 'react'
import uploadimg from "../../../assets/icons/uploadblog.png"

import { useDispatch, useSelector } from 'react-redux';
import { EditUserArtApi, getArtDetails, getSoundDetail, getUserArts } from '../../../redux/features/auth/authSlice';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


const EditUserUploadArt = ({closeWindow,selectedCheckboxes}) => {

  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id
  const id =selectedCheckboxes[0]

  const filterLists = useSelector((state) => state.auth.allArts);
  const {isLoading}= useSelector((state)=>state.auth)
const [imageUrl, setimageUrl] = useState(null)
  const [userImage, setuserImage] = useState(null)

       const [EditArt,setEditArt] = useState({
        title: "",
        description: "",
        format:filterLists?.formates?._id, 
        style:filterLists?.styles?._id,
        material :'',
        dimensions1:'',
        dimensions2:'',
        dimensions3:'',
        measurments:'',
        hashtag:'',
        format:'',
        style:'',
        material:'',
        owner_id: user_id,
       
       })
   
   const dispatch = useDispatch()

   const fileInputRef = useRef(null);

   // Function to handle avatar click and trigger file input
   const handleAvatarClick = () => {
     fileInputRef.current.click();
   };




useEffect(()=>{
  const getValues = async()=>{
    const data = await dispatch(getArtDetails({id:id}))
    const values = data.payload?.data

    if(values){
      setEditArt((prev)=>({
        ...prev,
        title:values?.title,
        description:values?.description,
        mood:values?.mood,
        genre:values?.genre,
        instrument:values?.instrument,
        vocals:values?.vocals,
        dimensions1:values?.dimension1,
        dimensions2:values?.dimension2,
        dimensions3:values?.dimension3,
        format:values?.format,
        style:values?.style,
        tags:values?.tags,
        material:values?.material,
      
       owner_id: user_id,
       id:id
      }))
      setimageUrl(values?.image)
    }

  }
  getValues()
},[])

   
   const onchange = (e) => {
     const { name, value } = e.target;
     setEditArt({ ...EditArt, [name]: value })
   };

   const handleFileChange = (e) => {
    const  file  = e.target.files[0];
 setuserImage(file)
    // Check if 'files' is defined and it's an array
   
  };
 

  


  const EditArtUser = async() => {

    const formData = new FormData()
  
    for (const key in EditArt) {
      if (EditArt.hasOwnProperty(key)) {
       
          formData.append(key, EditArt[key]);

     
      }
    }
if(userImage){
  formData.append('image',userImage)
}
    // for (const key in EditArt) {
    //   if (EditArt.hasOwnProperty(key)) {
    //     if (key === 'image') {
    //       // Convert image URL to Blob before appending to FormData
    //       const file = await convertUrlToBlob(EditArt[key][0]);
    //       formData.append(key, file);
    //     } else {
    //       formData.append(key, EditArt[key]);
    //     }
    //   }
    // }


    dispatch(EditUserArtApi(formData))
      .then(() => {
        closeWindow();
  
        toast.success('Music Updated Successfully', {
          position: "top-center",
          autoClose: 1000,
        });
  
        dispatch(getUserArts({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          user_id,
        }));
      });
  };
  

     



  return (
    <>
     <div className="row container " >
     <div className="row border-bottom fs-4  p-1">
            <div className="col">
                <p className='mb-3' style={{color:'#74A8B0',fontWeight:'700'}} >Edit details</p>
            </div>
            <div className="col d-flex justify-content-end">
            <FontAwesomeIcon className='text-muted fs-3' style={{cursor:'pointer'}} icon={faXmark} onClick={closeWindow} />
            </div>
        </div>
       <div className="col-md-1"></div>
          <div className="col-md-5 col-sm-12 mt-2">
          <div className="form-group my-2">
          <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
            fontWeight:'700'
          }}
        >
          Details
        </p>
            <input
              type="text"
              onChange={onchange}
              value={EditArt.title}
              className={`form-control fw-bold`}
              name="title"
              class="form-control"
              placeholder="Pop CAT"
            />
           
          </div>
          <div className="form-group my-4">
          {/* <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
          }}
        >
          Description
        </p> */}
            <textarea
              className='form-control fw-bold'
              onChange={onchange}
              value={EditArt.description}
              name="description"
              placeholder="Any Description here"
              rows="6"
            ></textarea>
           
          </div> 
           <div className="row">
        <div className="col py-0">
          <label htmlFor="" className="fs-5 fw-bold" style={{color:"rgb(116, 168, 176)"}}>Format</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={EditArt.format}
    onChange={onchange}
    name="format"
    >
    {
        filterLists?.formates?.map((formates,i)=>{
            return (
                <option key={i} value={formates._id}>{formates.title}</option>
            )
        })
      }
      </select>
        </div>
        <div className="col">
        <label htmlFor="" className="fs-5 fw-bold" style={{color:"rgb(116, 168, 176)"}}>Style</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={EditArt.style}
    onChange={onchange}
    name="style"
    >
    {
        filterLists?.styles?.map((style,i)=>{
          
            return (
                <option key={i} value={style._id}>{style.title}</option>
            )
        })
      }
      </select>
        </div>
             </div>
      
            <div className="row mt-1">
        <div className="col"> 
        <label htmlFor="" className="fs-5 fw-bold" style={{color: "#74A8B0"}}>Dimensions</label>
        <div className="d-flex align-items-center mt-1">
          <input
              type="text"
              onChange={onchange}
              value={EditArt.dimensions1}
              className='form-control'
              name="dimensions1"
              class="form-control"
              placeholder="100"
            />
            <span className="text-muted"> <CloseIcon style={{fontSize:'13px'}} /></span>
             <input
              type="text"
              onChange={onchange}
              value={EditArt.dimensions2}
              className='form-control'
              name="dimensions2"
              class="form-control"
              placeholder="100"
            />
              <span className="text-muted"> <CloseIcon style={{fontSize:'13px'}} /></span>
             <input
              type="text"
              onChange={onchange}
              value={EditArt.dimensions3}
              className='form-control'
              name="dimensions3"
              class="form-control"
              placeholder="10"
            />
             </div> 
        </div>
        <div className="col">
                <label htmlFor="" className="fs-5 fw-bold" style={{color:"rgb(116, 168, 176)"}}>Material</label>
  
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={EditArt.material}
    onChange={onchange}
    name="material"
    >
 
                <option  value='Paper'>Paper</option>
                <option value="Virtual">Virtual</option>
                <option value="Wall Art">Wall Art</option>

               
            
      </select>
        </div>
            </div>

            <div className="row mt-3">
           <div className="col-md-6">
        <select class="form-control" id="exampleFormControlSelect1"
    value={EditArt.measurments}
    onChange={onchange}
    name="measurments"
    >
    {
        filterLists?.styles?.map((style,i)=>{
          
            return (
                <option key={i} value={style._id}>{style.title}</option>
            )
        })
      }
      </select>
        </div>
            </div>
            <div className="row mt-3">
           <div className="col-md-12">
           <input
              type="text"
              onChange={onchange}
              value={EditArt.tags}
              className='form-control'
              name="hashtag"
              class="form-control fw-bold"
              placeholder="#Cat #Popat #art #printing"
            />
        </div>
            </div>

        </div>

        <div className="col-md-6 col-sm-12 mt-5 h-100">
         
         <div className="profile-image-container">
                       <input
                         className=''
                         type="file"
                         ref={fileInputRef}
                         style={{ display: 'none' }}
                         onChange={handleFileChange}
                         accept="image/*"
                       />

                       <div className="avatar d-flex align-items-end" onClick={handleAvatarClick}>
                         <img
                           src={
                             imageUrl && !userImage ? imageUrl[0] :
                               userImage ? URL.createObjectURL(userImage) :
                                 !userImage && !imageUrl ? uploadimg : ''
                           }
                           className="img-fluid rounded-0"
                           style={{ position: 'relative', width: '334px', height: '360px' }}
                           alt="Avatar"
                         />
                       

                       </div>
                     </div>
        </div> 
    
       
         <div className="d-flex justify-content-end text-end mt-3 border-top">
        <div className=" pt-2">
          <button
            className="btn text-white px-4 "
            onClick={EditArtUser}
           
            style={{ backgroundColor: "#74A8B0",textTransform:'capitalize' ,letterSpacing:'0.5px' }}
          >
            Update
          </button>
        </div>
      </div>
      </div>

    </>
  )
}

export default EditUserUploadArt