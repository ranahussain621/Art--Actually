import React, { useState,useEffect, useRef } from 'react'
import profile from "../../../assets/images/cardImage3.png"
import {useDispatch, useSelector } from 'react-redux'
import { addUserSound, getUserSound } from '../../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import uploadBlog from '../../../assets/icons/uploadblog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';




const UploadMusicDetail = ({selectedFile,duration,userimageuplift,nextPage,passToParent}) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const _id = user?.user[0]?._id;



  const [uploadedArtCount, setUploadedArtCount] = useState(0);


  const Mood = ["Happy","Sad","Aggressive","Funky","Joy" ]
  const Genre =  ["African","Canadian","Australian","pakistani","Saudi Arabia"]
  const Instrument =  ["Accordian","Flute","Drum","Trumpet","Guitar"]
  const Vocals = ["Yes","No"]
  
  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id



    const [addMusic,setAddMusic] = useState({
    
      title:'',
      description:'',
      owner_id:user_id,
      mood:Mood[0],
      genre:Genre[0],
      instrument:Instrument[0],
      vocals:Vocals[0],
      tags:'',
      image:''
    })
const [userImage, setuserImage] = useState()


const [errors, setErrors] = useState({
  title: '',
  description: '',
  tags: ''
});


const dispatch = useDispatch()
const navigate = useNavigate()
const fileInputRef = useRef(null);

const onchange = (e) => {
  const { name, value } = e.target;
  setAddMusic({ ...addMusic, [name]: value });
};



// Function to handle avatar click and trigger file input
const handleAvatarClick = () => {
  fileInputRef.current.click();
};


//add file in state
const handleFileChange = (event) => {
  const file = event.target.files[0];
  setuserImage(file)
  setAddMusic({ ...addMusic, image: file });
 userimageuplift(file)

};



const onKeyDown = (e) => {
  const { name, value } = e.target;
  if (name === 'tags' &&  e.keyCode === 32) {
    e.preventDefault();
    if (value?.trim() !== '') {
      const formattedTag = value?.trim();
      const tagsArray = addMusic.tags ? addMusic.tags?.split(',') : [];
      if (tagsArray?.length >= 7) {
        // Maximum limit reached, do not add the tag
        e.target.value = '';
        return;
      }
      const updatedTags = [...tagsArray,  formattedTag].join(',');
      setAddMusic({ ...addMusic, tags: updatedTags });
      e.target.value = '';
    } else {
      e.target.value = '#';
    }
  }
};

const handleChangeTags = (e) => {
  const { name, value } = e.target;
  setAddMusic({ ...addMusic, [name]: value });
};



useEffect(() => {
  const getData = async () => {
    const data = await dispatch(getUserSound({ user_id: _id }));
    setUploadedArtCount(data?.payload?.data?.length)
  };
  getData();
}, [_id,dispatch ]);



const validateForm = () => {
  let isValid = true;
  const updatedErrors = {
    title: '',
    description: '',
    tags: ''
  };

  if (addMusic.title.trim() === '') {
    updatedErrors.title = 'Title is required';
    isValid = false;
  }

  if (addMusic.description.trim() === '') {
    updatedErrors.description = 'Description is required';
    isValid = false;
  }

  if (addMusic.tags.trim() === '') {
    updatedErrors.tags = 'Tags are required';
    isValid = false;
  }


  setErrors(updatedErrors);
  return isValid;
};




const addUserMusic = async () => {
  if (!selectedFile) {
    return;
  }

  if (!validateForm()) {
    return;
  }

if(validateForm()){
  // let formData = new FormData();
  // formData.append('title', addMusic.title);
  // formData.append('description', addMusic.description);
  // formData.append('owner_id', User?.user[0]?._id);
  // formData.append('mood', addMusic.mood);
  // formData.append('genre', addMusic.genre);
  // formData.append('instrument', addMusic.instrument);
  // formData.append('vocals', addMusic.vocals);
  // formData.append('tags', addMusic.tags);
  // formData.append('file', selectedFile);
  // formData.append('image',addMusic.image)


  
passToParent(addMusic)
  nextPage();

  // const val = uploadedArtCount + 1;
  // setUploadedArtCount(val);
  
  // await dispatch(addUserSound(formData))
  
  //   .then(async () => {
  //     if(User?.user[0].vip === 'false' && val > 3){
        
  //       toast.error('Please Upgrade Membership',{
  //         autoClose:3000
  //       })
  //       navigate(`/payment-plans/${user_id}`)
  //       return
     
  //   }


    
   
  //   })
}
    
};








  return (
    <>
    <div className="detail-title mt-3">
        <p className='fw-semibold h4'style={{
            color:'#74A8B0'}}>Details</p>
    </div>
    <div className="row">
        <div className="col">
            <div className='form-group my-2'>
                 <input type="text"  onChange={onchange}
                   value={addMusic.title}
                   className={`form-control ${errors.title && 'is-invalid'}`}
                  name="title" class="form-control"
                   placeholder='Title(required)' />
                     {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className='form-group my-2'>
            <textarea 
           
            className={`form-control ${errors.description && 'is-invalid'}`}
            onChange={onchange} 
             value={addMusic.description} 
             name="description"
              placeholder='Description' 
               rows="3"></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
           

           <div className="row ">
            <div className="col my-2">
            <div class="form-group mood">
    <label for="exampleFormControlSelect1" style={{color:"#74A8B0"}}>Mood</label>
    <select class="form-control" id="exampleFormControlSelect1"
    value={addMusic.mood}
    onChange={onchange}
    name="mood"
    >
    {
        Mood?.map((mood,i)=>{
            return (
                <option key={i} value={mood}>{mood}</option>
            )
        })
      }
      </select>
  </div>
  <div class="form-group instrument">
    <label for="exampleFormControlSelect1" style={{color:"#74A8B0"}}>Instrument</label>
    <select class="form-control" id="exampleFormControlSelect1"
    value={addMusic.instrument}
    onChange={onchange}
    name="instrument"
    >
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
            <div className="col my-2">

            <div class="form-group Genre">
    <label for="exampleFormControlSelect1" style={{color:"#74A8B0"}}>Genre</label>
    <select value={addMusic.genre} 
    name="genre"
    onChange={onchange}
    class="form-control" id="exampleFormControlSelect1" >
    {
        Genre?.map((instrument,i)=>{
            return (
                <option key={i} value={instrument}>{instrument}</option>
            )
        })
      }
      </select>
  </div>
  <div class="form-group Vocals">
    <label for="exampleFormControlSelect1" style={{color:"#74A8B0"}}>Vocals</label>
    <select class="form-control"
    
     id="exampleFormControlSelect1"
     value={addMusic.vocals}
     
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

           <div className='form-group my-2'>
           <input
              type="text"
              className={`form-control text-muted ${errors.tags && 'is-invalid'}`}
              placeholder="#hashTags"
              value={addMusic.tags}
              onChange={handleChangeTags}
              onKeyDown={onKeyDown}
              name="tags"
            /> 
             {errors.tags && <div className="invalid-feedback">{errors.tags}</div>}
                       </div>
        </div>

        <div className="col">
            <div className="image d-flex justify-content-center align-items-center">
               
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
                          style={{ position: 'relative', width: '264px', height: '265px' }}
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
            <div className="d-flex  my-5">
                <div className='mx-2'>
                    <p className='fw-semibold m-0' style={{color
                    :"#74A8B0"}}>Track Title</p>
                    <p className='text-muted'>
                    {selectedFile?.name?.split(' ').slice(0, 4).join(' ')}
            {selectedFile?.name?.split(' ').length > 4 ? '...' : ''}
                     </p>
                </div>
                <div className='mx-2 text-end'>
                    <p className='fw-semibold m-0' style={{color:'#74A8B0'}}>track length</p>
                    <p className='text-muted'>{duration? duration:'00'} </p>
                </div>
            </div>

        </div>
    </div>
    <div className="d-flex justify-content-end  text-end mt-3 border-top">
        <div className=' pt-2'>
             <button className='btn text-white'
           
                 onClick={addUserMusic}
                
                 style={{backgroundColor:'#74A8B0'}} >
                   NEXT</button>
        </div>
   
    </div>
    </>
  )
}

export default UploadMusicDetail