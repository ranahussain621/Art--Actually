import React, { useEffect, useState } from 'react';
import profile from "../../assets/images/cardImage3.png";
import { useDispatch, useSelector } from 'react-redux';
import { addUserArt,getUserArts,getUserSound } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const UserUloadArtVisibility = ({addArt,close}) => {

  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id

  const navigate = useNavigate();
  const {isLoading}= useSelector((state)=>state.auth)
  const [visibility, setVisibility] = useState('private');
  const [donation, setDonation] = useState('none');
  const [uploadedArtCount, setUploadedArtCount] = useState(0);

         const dispatch = useDispatch()
  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleDonationChange = (event) => {
    setDonation(event.target.value);
  };


  const getData = async () =>{
   await dispatch(getUserArts({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      user_id,
    }))
  }

  useEffect(() => {
    const getDataForCount = async () => {
      const data = await dispatch(getUserArts({ user_id: user_id }));
      setUploadedArtCount(data?.payload?.data?.length)
    };
    getDataForCount();
  }, [user_id,dispatch ]);


  const Public = async () =>{

    const val = uploadedArtCount + 1;
    setUploadedArtCount(val);

    const formData = new FormData();

    for (const key in addArt) {
      formData.append(key, addArt[key]);
    }

    formData.append("visibility", visibility);
    formData.append("donation", donation);

    if(User?.user[0].vip === 'false' && val > 3){
      toast.error('Please Upgrade Membership',{
               autoClose:3000
             })
              close()
             navigate(`/payment-plans/${user_id}`)
             return
     
       }else{
   await dispatch(addUserArt(formData))
   .then((res)=>{
     getData()
    if(User?.user[0].vip === 'true'){
      toast.success(res?.payload?.message,{
        autoClose:1000
      }) 
    }
    
    close()
   })
  }

  }

  const back = () =>  {
     // eslint-disable-next-line no-unused-expressions
  }



  return (
    <>
      <div className="detail-title mt-3 card-body">
        <p className='fw-semibold h4 mb-0' style={{ color:'#74A8B0' }}>Visibility</p>
        <p className='mb-0 fw-bold' style={{color:'#74A8B0'}}>Who can see your artwork</p>
      </div>
      <div className="row card-body pt-0 my-4">
        <div className="col-md-6 col-sm-12">
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
                value="everyone"
                checked={visibility === 'everyone'}
                onChange={handleVisibilityChange}
              />
              <label className="form-check-label" style={{ color:'#74A8B0' }}>
                Public - Everyone
              </label>
            </div>
          </div>

          <div className="detail-title mt-5">
            <p className='fw-semibold h4' style={{ color:'#74A8B0' }}>Donation Setting</p>
            <p className='fw-bold' style={{ color:'#74A8B0' }}>Who can donate your artwork</p>
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

        <div className="col-md-6 col-sm-12">
          <div className="image d-flex justify-content-center align-items-center">
            <img
                src={addArt?.image ? URL.createObjectURL(addArt?.image) :  profile  }
                  className="img-circle img-fluid  "
                  style={{ width: '300px',height:'300px', position: 'relative' }}
                  alt="Avatar"
                />
          </div>
     
        </div>
      </div>
      <div className="d-flex justify-content-end  text-end mt-5 border-top">
        <div className="mx-2 pt-2">
          <button className='btn btn-secondary' disabled onClick={back}>
            BACK
          </button>
        </div>
        <div className=" pt-2">
          <button className='btn text-white' style={{ backgroundColor:'#4e7e85' }} onClick={Public}>
            {isLoading?"loading...":"PUBLIC"}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserUloadArtVisibility;
