import React,{useEffect, useRef, useState} from 'react'
import uploadimg from "../../../assets/icons/uploadblog.png"

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { EditUserSound,getSoundDetail,getUserSound } from '../../../redux/features/auth/authSlice';
import {toast} from 'react-toastify'
import { baseURL } from '../../../redux/axios/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


const EditMusicDetails = ({closeWindow,selectedCheckboxes}) => {

  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id

  const id =selectedCheckboxes[0]

const{isLoading} = useSelector((state)=>state.auth)
  const Mood = ["Happy","Sad","Aggressive","Funky","Joy" ]
  const Genre =  ["African","Canadian","Australian","pakistani","Saudi Arabia"]
  const Instrument =  ["Accordian","inst2","inst3","inst4","inst5"]
  const Vocals = ["Yes","No"]
  const [userImage, setuserImage] = useState()

  const [imageUrl, setimageUrl] = useState(null)

       const [EditMusic,setEditMusic] = useState({
         title:'',
         description:'',
         mood:'',
         genre:'',
         instrument:'',
         vocals:'',
         tags:'',
        id :'',
     
        owner_id:''
       })

   
   
   
   const dispatch = useDispatch()


   const fileInputRef = useRef(null);

   // Function to handle avatar click and trigger file input
   const handleAvatarClick = () => {
     fileInputRef.current.click();
   };


useEffect(()=>{
  const getValues = async()=>{
    const data = await dispatch(getSoundDetail({id:id}))
    const values = data.payload?.data
    
    if(values){
      setEditMusic((prev)=>({
        ...prev,
        title:values?.title,
        description:values?.description,
 
        mood:values?.mood,
        genre:values?.genre,
        instrument:values?.instrument,
        vocals:values?.vocals,
        tags:values?.tags,
       
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
     setEditMusic({ ...EditMusic, [name]: value });


   };


   const handleFileChange = (e) => {
    const  file  = e.target.files[0];
 setuserImage(file)
    // Check if 'files' is defined and it's an array
   
  };





   const onKeyDown = (e) => {
    const { name, value } = e.target;
    if (name === 'tags' &&  e.keyCode === 32) {
      e.preventDefault();
      if (value?.trim() !== '') {
        const formattedTag = value?.trim();
        const tagsArray = EditMusic.tags ? EditMusic.tags?.split(',') : [];
        if (tagsArray?.length >= 7) {
          // Maximum limit reached, do not add the tag
          e.target.value = '';
          return;
        }
        const updatedTags = [...tagsArray,  formattedTag].join(',');
        setEditMusic({ ...EditMusic, tags: updatedTags });
        e.target.value = '';
      } else {
        e.target.value = '#';
      }
    }
  };
  
  const handleChangeTags = (e) => {
    const { name, value } = e.target;
    setEditMusic({ ...EditMusic, [name]: value });
    
  };
  


  const EditUserMusic = (e) => {
    e.preventDefault();

    const formData = new FormData()
  
    for (const key in EditMusic) {
      if (EditMusic.hasOwnProperty(key)) {
       
          formData.append(key, EditMusic[key]);

     
      }
    }
if(userImage){
  formData.append('image',userImage)
}

    dispatch(EditUserSound(formData))
      .then(() => {
        closeWindow();
  
        toast.success('Music Updated Successfully', {
          position: "top-center",
          autoClose: 1000,
        });
  
        dispatch(getUserSound({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          user_id,
        }));
      });
  };
  

     



  return (
    <>
      <div className="card  border-0 " style={{overflow:'hidden'}}>
          <div className="row border-bottom fs-4 px-4 py-2">
            <div className="col-md-6 col-sm-6">
                <p className='mb-3' style={{color:'#74A8B0',fontWeight:'700'}} >Edit details</p>
            </div>
            <div className="col-md-6 col-sm-6 d-flex justify-content-end">
            <FontAwesomeIcon className='text-muted fs-3' style={{cursor:'pointer'}} icon={faXmark} onClick={closeWindow} />
            </div>
        </div>
    <div className="card-body pt-0 px-5">
  
        {isLoading?
      (
        <div className='text-center openSans-500 fs-5 mt-3'><p>Loading...</p></div>
      )  
      :
      (
      <>
                <div className="detail-title mt-3">
        <p className='fw-semibold h4'style={{
            color:'#74A8B0'}}>Details</p>
    </div>
    <div className="row">
        <div className="col-md-6 col-sm-12">
            <div className='form-group my-2 '>
                 <input type="text"
                 onChange={onchange} 
                  value={EditMusic.title} name="title"
                  class="form-control" placeholder='Title(required)' />
            </div>
            <div className='form-group my-2'>
            <textarea class="form-control "  
            onChange={onchange}  value={EditMusic.description} name="description"
            placeholder='Any Description here'  rows="6"></textarea>
            </div>
           

           <div className="row">
            <div className="col-md-6 col-sm-12 my-2">
            <div class="form-group mood">
    <label for="exampleFormControlSelect1" className='fw-bold' style={{color:"#74A8B0"}}>Mood</label>
    <select class="form-control"
     value={EditMusic.mood}
     onChange={onchange}
     name="mood"
    id="exampleFormControlSelect1">
      {
        Mood?.map((mood,i)=>{
            return (
                <option key={i} value={mood}>{mood}</option>
            )
        })
      }
    </select>
  </div>
  <div class="form-group instrument mt-3">
    <label className='fw-bold' for="exampleFormControlSelect1" style={{color:"#74A8B0"}}>Instrument</label>
    <select class="form-control " 
     value={EditMusic.mood}
     onChange={onchange}
     name="instrument"
    id="exampleFormControlSelect1">
    {
        Instrument?.map((instrument,i)=>{
            return (
                <option key={i} value={instrument}>{instrument}</option>
            )
        })
      }
    </select>
  </div>

            </div>
            <div className="col-md-6 col-sm-12 my-2">

            <div class="form-group Genre">
    <label for="exampleFormControlSelect1" className='fw-bold' style={{color:"#74A8B0"}}>Genre</label>
    <select class="form-control"
     value={EditMusic.mood}
     onChange={onchange}
     name="genre"
    id="exampleFormControlSelect1">
    {
        Genre?.map((genre,i)=>{
            return (
                <option key={i} value={genre}>{genre}</option>
            )
        })
      }
    </select>
  </div>
  <div class="form-group Vocals mt-3">
    <label for="exampleFormControlSelect1" className='fw-bold' style={{color:"#74A8B0"}}>Vocals</label>
    <select class="form-control"
    
    id="exampleFormControlSelect1"
    value={EditMusic.vocals}
    
    onChange={onchange}
    name="vocals"
    >
     {
       Vocals.map((vocal,i)=>{
         return (
          <>
          
           <option value={vocal} key={i}>{vocal}</option>
          </>
          
         )
       })
     }
     
   </select>
  </div>
            </div>
           </div>

           <div className='form-group my-3'>
           <input
              type="text"
              className="form-control text-muted"
              placeholder="#hashTags"
              value={EditMusic.tags}
              onChange={handleChangeTags}
              onKeyDown={onKeyDown}
              name="tags"
            />
            </div>
        </div>

        <div className="col-md-6 col-sm-12">
         
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
                              className=" img-fluid  "
                              style={{ position: 'relative', width: '334px', height: '335px' }}
                              alt="Avatar"
                            />
                          

                          </div>
                        </div>
        </div>
    </div>
    <div className="d-flex justify-content-end  text-end mt-5 border-top">
        <div className=' pt-2'>
             <button className='btn text-white'
                 onClick={EditUserMusic}
                 style={{backgroundColor:'#74A8B0'}}>
                   Update</button>
        </div>
   
    </div>
      </>
 
      )
      }

         
        </div>
        </div>

    </>
  )
}

export default EditMusicDetails