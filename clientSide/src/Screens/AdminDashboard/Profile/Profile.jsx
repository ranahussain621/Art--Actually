import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera,faShareNodes } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './profile.css'
import  { UpdateUser, getUserDetails, newPassword } from '../../../redux/features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import ArtistCancelSubscriptionRequest from './ArtistCancelSubscriptionRequest';
import { Country, State, City }  from 'country-state-city';




const Profile = ({onButtonClick}) => {



  const user =JSON.parse(localStorage.getItem('user'))
  
  const userID = user?.user[0]?._id
const updatedUserDetail = useSelector((state)=>state.auth.userDetail);

const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);


  const dispatch = useDispatch()

const [userImage, setuserImage] = useState()
const [subModal, setsubModal] = useState(false)
const [passwordData, setpasswordData] = useState({
  id:user?.user[0]._id,
  newpassword:'',
  confirmpassword:'',
})
  const [info,setInfo] = useState({
    id: userID,
    firstName: '',
    image:null,
    lastName: '',
    status: '',
    vip: '',
    national_code: '',
    phone: '',
    dob: '',
    country: '',
    education_level:'',
    city: '',
    style: '',
    solo_exhibition: '',
    group_exhibition: '',
    commisions: '',
    awards: '',
    Residencies: '',
    Publications: '',
    Collections: ''
})




useEffect(()=>{
if(updatedUserDetail){
  setInfo((prev)=>({
    ...prev,
   
    firstName: updatedUserDetail?.user?.firstName,
    image:updatedUserDetail?.user?.image[0],
    lastName: updatedUserDetail?.user?.lastName,
    status: updatedUserDetail?.user?.status,
    vip: updatedUserDetail?.user?.vip,
    national_code: updatedUserDetail?.user?.national_code,
    phone: updatedUserDetail?.user?.phone,
    dob: updatedUserDetail?.user?.dob,
    country: updatedUserDetail?.user?.country,
    education_level:updatedUserDetail?.user?.education_level,
    city: updatedUserDetail?.user?.city,
    style: updatedUserDetail?.user?.style,
    solo_exhibition: updatedUserDetail?.user?.solo_exhibition,
    group_exhibition: updatedUserDetail?.user?.group_exhibition,
    commisions: updatedUserDetail?.user?.commisions,
    awards: updatedUserDetail?.user?.awards,
    Residencies: updatedUserDetail?.user?.Residencies,
    Publications: updatedUserDetail?.user?.Publications,
    Collections: updatedUserDetail?.user?.Collections 
  }))
}
},[updatedUserDetail,userID])


useEffect(()=>{
  const data = async()=>{
    
  await dispatch(getUserDetails({id:userID}))

  }
  data()
 
},[userID,dispatch])
   

const fileInputRef = useRef(null);

// Function to handle avatar click and trigger file input
const handleAvatarClick = () => {
  fileInputRef.current.click();
};


  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);
  }, []);


  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setInfo((prevState) => ({
      ...prevState,
      country: selectedCountry,
    }))

      const countryData = countries.find((c) => c.name === selectedCountry)
      // const Data = countries.find((c) => c.name === info?.country)
     
  if (countryData) {
    const countryCities = City.getCitiesOfCountry(countryData.isoCode);
    setCities(countryCities);
  } else {
    setCities([]); 
  }
  }







//add file in state
const handleFileChange = (event) => {
  const file = event.target.files[0];
setuserImage(file)
  setInfo((prevState) => ({
    ...prevState,
    image: file,
  }));
 
};


// // add phone in state
//   const handlePhoneChange = (value) => {
//     setInfo((prevState) => ({
//       ...prevState,
//       phone: value,
//     }));
//   };
// all other feild data add in state
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
// [assword feild data add in state
const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setpasswordData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

//set update password 
const sendPasswordData = async()=>{ 
if(passwordData.newpassword !== passwordData.confirmpassword){
  toast.error("New password and confirm password must match")

  return
}else{
    dispatch(newPassword(passwordData))
 
  .then((res)=>{
    toast.success(res.payload.message)
    setpasswordData({
      newpassword:'',
      confirmpassword:'',
    })
    onButtonClick()

  })
}

}

const cancelSubscripton =()=>{
setsubModal(!subModal)
}


  const save = async () => {
    
    const formData = new FormData();
  
   
  
    // Loop through the fields in info
    for (const key in info) {
      // Check if the field in info is different from the original user detail
      if (info[key] !== updatedUserDetail?.user[key]) {
        formData.append(key, info[key]);
      }
    }
  
    // Dispatch the update action with the FormData containing only the changed fields
    await dispatch(UpdateUser(formData))
    .then((res)=>{
      if(res.payload.success=== true ){
        toast.success(res.payload.message)
        dispatch(getUserDetails({id:userID}))
        onButtonClick()
      }
    }
    )
  };
  

  return (
   
    <div className="container-fluid mt-2 ps-4" style={{backgroundColor:"white"}}>
      <div className="row">
        <div className="row d-flex align-items-center">
        <div className="col-md-3 col-sm-5">
      <div className="profile-image-container">
        <input
           className=''
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />

        <div className="avatar" onClick={handleAvatarClick}>
            <img
                   src={
                    updatedUserDetail?.user?.image[0] && !userImage ? updatedUserDetail?.user?.image[0] : 
                    userImage  ? URL.createObjectURL(userImage):
                    !userImage && !updatedUserDetail?.user?.image ? 'https://bootdey.com/img/Content/avatar/avatar7.png':''
                   }
                  className="img-circle img-fluid img-thumbnail rounded-circle"
                  style={{ width: '250px',height:'250px', position: 'relative' }}
                  alt="Avatar"
                />
                
          <FontAwesomeIcon icon={faCamera} className="camera-icon mt-5" style={{ position: 'relative', top: '50%', Right: '50%', transform: 'translate(-50%, -50%)', color:"#CACED8" }} />
       
        </div>
      </div>
    </div>
   
            <div className="col-md-3 col-sm-6">
                <h3 className='openSans-700' style={{color:'#083A50', fontSize:"24px", fontWeight:"500", lineHeight:"29.05px"}}>
                    {updatedUserDetail?.user?.firstName} {updatedUserDetail?.user?.lastName}
                </h3>
                {/* <h5 className='openSans-400' style={{color:'#083A50', fontSize:"20px", fontWeight:"300", lineHeight:"19.05px"}}>
                    Your account is ready
                </h5> */}
            </div>
            <div className="col-md-6 col-sm-1 text-end ">
            <button className='btn px-4' 
                onClick={onButtonClick}
                
                style={{fontWeight:'500',color:"#fff",background:'#709AA4'}}>Back</button>
            </div>
        </div>
        <div className="row mt-4 ">
            <div className="col-md-6 col-sm-6">
                <h4 className='fs-3 openSans-800' style={{fontWeight:'600',color:"#CACED8", fontSize:"24px"}}>Update Password</h4>
            </div>
            <div className="col-md-6 col-sm-6 text-end ">
            <button className='btn px-4 p-2' 
                onClick={cancelSubscripton}
                disabled={ user?.user[0]?.subscribe==='false'}
                style={{fontWeight:'500',color:"#fff",background:'#709AA4'}}>Cancel Subscription</button>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col">
           <div className="row">
      
    <div class="mb-3">
  <label for="exampleFormControlInput1"  class="form-label openSans-500" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>New Password</label>
  <input type="password" class="form-control w-25" style={{border:"1px solid #CACED8"}}name='newpassword' onChange={handlePasswordChange} id="exampleFormControlInput1"  />
    </div>
    <div class="mb-3">
  <label for="exampleFormControlInput1"  class="form-label openSans-500" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Confirm New Password</label>
  <input type="password" class="form-control w-25" style={{border:"1px solid #CACED8"}}name='confirmpassword' onChange={handlePasswordChange} id="exampleFormControlInput1"  />
    </div>
    <div className=" w-100 text-end">
      <button type='button' className='btn  'style={{fontWeight:'500',color:"#fff",background:'#709AA4'}} onClick={sendPasswordData}>Update Password</button>


    </div>
           </div>
           </div>
           </div>
        <div className="row mt-4 ">
            <div className="col-md-6 col-sm-6">
                <h4 className='fs-3 openSans-700' style={{fontWeight:'600',color:"#CACED8", fontSize:"24px"}}>Edit Profile</h4>
            </div>
            {/* <div className="col-md-6 col-sm-6 text-end pe-5">
                <p className='text-muted fs-6 openSans-400' style={{color:"#CACED8"}}>
                    last update June 1
                </p>
            </div> */}
        </div>
        <div className="row mt-3">
            <div className="col">
           <div className="row">
            <div className="col">
            <div class="mb-3">
  <label for="exampleFormControlInput1"  class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>First Name</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}}name='firstName' onChange={handleInputChange} value={info.firstName} id="exampleFormControlInput1"  />
    </div>
            </div>
            <div className="col">
            <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Last Name</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='lastName' onChange={handleInputChange} value={info.lastName} id="exampleFormControlInput1"  />
    </div>
            </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>National Code</label>
  <input type="number" class="form-control" style={{border:"1px solid #CACED8"}} name='national_code' onChange={handleInputChange} value={info.national_code} id="exampleFormControlInput1" placeholder="Enter Code" />
    </div>
           </div> 
           <div className="row" aria-disabled>
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Date of Birth</label>
  <input type="date" class="form-control" style={{border:"1px solid #CACED8"}} name='dob' onChange={handleInputChange} value={info.dob} id="exampleFormControlInput1" placeholder="Enter Code" />
    </div>
           </div>
           <div className="row">
           <div className="mb-3">
           <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Education Level</label>

           <select class="form-select" aria-label="Default select example" value={info.education_level} name='education_level' onChange={handleInputChange} >
  <option className='text-muted' value={'software'}>Software</option>
 
 
</select>
           </div>
           </div> 
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Style</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='style' onChange={handleInputChange} value={info.style} id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Group Exhibhition</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='group_exhibition' onChange={handleInputChange} value={info.group_exhibition}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Awards</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='awards' onChange={handleInputChange} value={info.awards}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Publications</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='Publications' onChange={handleInputChange} value={info.Publications}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
            </div>
            <div className="col">
            <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Email</label>

 <input type="email" readOnly disabled class="form-control" style={{border:"1px solid #CACED8"}} name='Publications' onChange={handleInputChange} value={user?.user[0]?.email}  id="exampleFormControlInput1" placeholder="" />


    </div>
           </div>
           {/* <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label" style={{color:"#083A50" , fontWeight:'600',letterSpacing:'0.9px'}}>Phone Number</label>
  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="" />
    </div>
           </div> */}
            <div className="row">
           <div class="mb-3">
            
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Phone Number</label>

  


 {/* <PhoneInput
  className='w-100 phone-input'
  style={{ border: "1px solid #CACED8" }}
  inputProps={{
    name: "phone",
    required: true,
    autoFocus: true,
  }}
  placeholder="Enter phone number"
  country={info.phone ? info.phone : "US"}// Default country code
  value={info.phone}
  onChange={handlePhoneChange}
/>  */}

<input type="number" class="form-control" style={{border:"1px solid #CACED8"}} name='phone' onChange={handleInputChange} value={info.phone} id="exampleFormControlInput1" placeholder="Enter phone number" />


 
 </div>
           </div> 
           <div className="row">
           <div className="mb-3">
           <label for="exampleFormControlInput1" class="form-label openSans-400 mt-2" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Country</label>

           <select class="form-select" aria-label="Default select example" name='country' onChange={handleCountryChange} value={info?.country} >

          {
              countries?.map((item,i)=>{
               
                return (
                    <option key={i} className='text-muted' value={item.name}>{item.name}</option>
                )
              })
            }  
            
  
 
</select>
           </div>
           </div>
           <div className="row">
           <div className="mb-3">
           <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>City</label>

           <select class="form-select" aria-label="Default select example" name='city'
          
           onChange={handleInputChange} value={info?.city} >
<option selected disabled>{info?.city}</option>
{  
    cities?.map((item,i)=>{
      return (<>
      
       <option key={i} className='text-muted' value={item.name}>{item.name}</option>
      </>
        
         
      )
    })
  }  
  


</select>
 

           </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Solo Exhibition</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='solo_exhibition' onChange={handleInputChange} value={info.solo_exhibition}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400 " style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Commissions</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='commisions' onChange={handleInputChange} value={info.commisions}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400 mt-1" style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Residencies</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='Residencies' onChange={handleInputChange} value={info.Residencies}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>
           <div className="row">
           <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label openSans-400 " style={{color:"#083A50" , fontWeight:'500',lineHeight:"19.6px", fontSize:"16px"}}>Collections</label>
  <input type="text" class="form-control" style={{border:"1px solid #CACED8"}} name='Collections' onChange={handleInputChange} value={info.Collections}  id="exampleFormControlInput1" placeholder="" />
    </div>
           </div>

            </div>
        </div>
       
        <div className="row">
            <div className="col">
            <button className='btn px-5 rounded-3 mb-4 mt-3 openSans-400' onClick={save} style={{background:'#709AA4',color:'white' ,fontWeight:'700' ,letterSpacing:'0.9px'}}>
                   Save
            </button>
            </div>
        </div>
      </div>
      <ArtistCancelSubscriptionRequest
  
    closeModal={cancelSubscripton}
    ModalIsOpen={subModal}
    />
    </div>
  );
};

export default Profile;
