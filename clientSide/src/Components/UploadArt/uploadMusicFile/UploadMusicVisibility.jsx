import React, { useEffect, useState } from 'react';
import profile from "../../../assets/images/cardImage3.png";
import { useDispatch,useSelector } from 'react-redux';
import { Visibility,getUserSound,addUserSound } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const UploadMusicVisibility = (props) => {
  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id
  const navigate = useNavigate()
const {isLoading}= useSelector((state)=>state.auth)

  const [uploadedArtCount, setUploadedArtCount] = useState(0);
  const {userList} = useSelector((state)=>state.auth)
 
  const sound_id = userList?.data?._id


  const [visibility, setVisibility] = useState('private');
  const [donation, setDonation] = useState('none');
  
         const dispatch = useDispatch()
  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleDonationChange = (event) => {
    setDonation(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getUserSound({ user_id: user_id }));
      setUploadedArtCount(data?.payload?.data?.length)
    };
    getData();
  }, [user_id,dispatch ]);


  const getData = async () =>{
   await dispatch(getUserSound({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      user_id,
    }))
  }


  const Public = async () =>{

    const val = uploadedArtCount + 1;
    setUploadedArtCount(val);

     let formData = new FormData();
  formData.append('title', props.allDetail?.title);
  formData.append('description', props.allDetail?.description);
  formData.append('owner_id', user_id);
  formData.append('mood', props.allDetail?.mood);
  formData.append('genre', props.allDetail?.genre);
  formData.append('instrument', props.allDetail?.instrument);
  formData.append('vocals', props.allDetail?.vocals);
  formData.append('tags', props.allDetail?.tags);
  formData.append('file', props.selectedFile);
  formData.append('image',props.allDetail?.image)
  formData.append('visibility',visibility)

  formData.append('donation',donation)



  // await dispatch(Visibility({
  //   user_id,
  //   visibility,
  //   donation,
  //   sound_id
  //  }))
  if(User?.user[0].vip === 'false' && val > 3){
 toast.error('Please Upgrade Membership',{
          autoClose:3000
        })
         props.close()
        navigate(`/payment-plans/${user_id}`)
        return

  }else{
 await dispatch(addUserSound(formData))
  
    .then(() => 
    {
       getData()
        toast.success('Sound Added Successfully',{
        autoClose:1000
      }) 
      
      props.close()
      })

  }


 

  //  .then(()=>{
  //   if(User?.user[0].vip === 'true'){
     
  //   }
    
   
  //  })


  }



  return (
    <>
      <div className="detail-title mt-3">
        <p className='fw-semibold h4' style={{ color:'#74A8B0' }}>Visibility</p>
        <p>Who can see your artwork</p>
      </div>
      <div className="row">
        <div className="col">
          <div className="visibility border rounded-2">
            <div className="form-check my-2 mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={handleVisibilityChange}
              />
              <label className="form-check-label" style={{ color:'#74A8B0' }}>
                Private - Only you
              </label>
            </div>

            <div className="form-check my-2 mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={handleVisibilityChange}
              />
              <label className="form-check-label" style={{ color:'#74A8B0' }}>
                Public - Everyone
              </label>
            </div>
          </div>

          <div className="detail-title mt-5">
            <p className='fw-semibold h4' style={{ color:'#74A8B0' }}>Donation Setting</p>
            <p style={{ color:'#74A8B0' }}>We can donate your artwork</p>
          </div>

          <div className="visibility border rounded-2">
            <div className="form-check my-2 mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="donation"
                value="everyone"
                checked={donation === 'everyone'}
                onChange={handleDonationChange}
              />
              <label className="form-check-label" style={{ color:'#74A8B0' }}>
                Everyone (premium)
              </label>
            </div>

            <div className="form-check my-2 mx-2">
              <input
                className="form-check-input"
                type="radio"
                name="donation"
                value="none"
                checked={donation === 'none'}
                onChange={handleDonationChange}
              />
              <label className="form-check-label" style={{ color:'#74A8B0' }}>
                None
              </label>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="image d-flex justify-content-center align-items-center">
          
            <img
                   src={props?.userImage?
                     URL.createObjectURL(props?.userImage):
                     profile
                   }
                  className="img-circle img-fluid  "
                  style={{ width: '260px',height:'260px', position: 'relative' }}
                  alt="Avatar"
                />
          </div>
          <div className="d-flex  my-5">
                <div className='mx-2'>
                    <p className='fw-semibold m-0' style={{color
                    :"#74A8B0"}}>Track Title</p>
                    <p className='' >
                    {props?.selectedFile?.name?.split(' ').slice(0, 4).join(' ')}
            {props?.selectedFile?.name?.split(' ').length > 4 ? '...' : ''}
                     </p>
                </div>
                <div className='mx-2 text-end'>
                    <p className='fw-semibold m-0' style={{color:'#74A8B0'}}>track length</p>
                    <p className='text-muted'>{props?.duration? props?.duration:'00'} </p>
                </div>
            </div>
        </div>
      </div>
      <div className="d-flex justify-content-end  text-end mt-3 border-top">
        <div className="mx-2 pt-2">
          <button className='btn btn-secondary' onClick={props.backPage}>
            BACK
          </button>
        </div>
        <div className=" pt-2">
          <button className='btn text-white' style={{ backgroundColor:'#74A8B0' }} onClick={Public}>
           {isLoading? "Loading...":"PUBLIC"} 
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadMusicVisibility;
