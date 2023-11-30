import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateUser, getUserDetails } from '../../../redux/features/auth/authSlice'
import {toast} from 'react-toastify'

const PublicProfile = () => {

    const USER = JSON.parse(localStorage.getItem('user'))
    const userID =USER?.user[0]?._id

    const {user} = useSelector(state => state.auth.userDetail )

    const [data, setData] = useState({
     name:'',
      about :'',
      website:'',
      instragram :'',
      facebook:'',
      image:null,
      imageURL:null,
      id:userID
    })

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const dispatch = useDispatch()

    useEffect(()=>{
        const data = async()=>{  
        await dispatch(getUserDetails({id:userID}))
        }
        data()
      },[userID,dispatch])


      const selectPic = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; 
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0]; 
          if (file) {
            const imageURL = URL.createObjectURL(file);
            setData((prevState) => ({
              ...prevState,
              image: file,
              imageURL,
            }));
          }
        });
        fileInput.click();
      };

      // const update = async () =>{
      //   const formData = new FormData();
      //   for (const key in data) {
      //     formData.append(key, data[key]);
      //   }
      //     await dispatch(UpdateUser(formData))
      //     .then((res)=>{
      //       toast.success(res.payload.message,{autoClose:1000})
      //     })
      // }

      const update = async () => {
        // Create a copy of the data object without the imageURL property
        const { imageURL, ...dataWithoutImageURL } = data;
    
        const formData = new FormData();
        
        for (const key in dataWithoutImageURL) {
          formData.append(key, dataWithoutImageURL[key]);
        }
      
        await dispatch(UpdateUser(formData))
          .then((res) => {
            toast.success(res.payload.message, { autoClose: 1000 });
          });
      };
      

  return (
    <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <h4 className="fs-3 openSans-800" style={{ fontWeight: '600', color: '#8f9bb9', fontSize: '24px' }}>
            Public Profile
          </h4>
          <h6 className='openSans-300' style={{ color: '#8f9bb9' }}>
            People visiting your profile will see the following info
          </h6>
          <p className='openSans-300 mt-5' style={{ color: '#8f9bb9' }}>
            photo
          </p>
  
          {/* <div className="rounded-circle" style={{ background: '#8f9bb9', height: '190px', width: '190px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
            {/* {data.imageURL ?   <img className="rounded-circle h-100 w-100" 
            // src={ user?.image ? user?.image[0] : user?.firstName[0]} 
           
            alt="Selected"  /> : (
                <span className="mb-4" style={{ color: 'white', fontSize: '188px', fontWeight: 'bolder',textTransform:'capitalize' }}>
                  {user?.firstName[0]}
                </span>
              )} */}
           
      


         
          {/* </div> */} 

          <div
          className="rounded-circle"
          style={{
            background: '#8f9bb9',
            height: '190px',
            width: '190px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data.imageURL ? (
            <img
              className="rounded-circle h-100 w-100"
              src={data.imageURL}
              alt="Selected"
            />
          ) : user?.image[0] ? (
            <img
              className="rounded-circle h-100 w-100"
              src={user?.image[0]}
              alt="User's Profile"
            />
          ) : (
            <span
              className="mb-4"
              style={{
                color: 'white',
                fontSize: '188px',
                fontWeight: 'bolder',
                textTransform: 'capitalize',
              }}
            >
              {user?.firstName[0]}
            </span>
          )}
        </div>
          <button className='btn text-white rounded-pill mt-md-4 openSans-600 px-4 d-flex justify-content-center' onClick={selectPic} style={{background:'#8f9bb9'}}>Change</button>

     <div className="row mt-md-5">
        <div className="col">
        <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label openSans-400 mb-md-1"  style={{ color: '#8f9bb9' }}>
                    username
                  </label>
                  <input
                    type="text"
                    className="form-control openSans-500"
                    placeholder='Your Name'
                    style={{ border: '1px solid #CACED8' }}
                    name="name"
                    onChange={handleChange}
                    id="exampleFormControlInput1"

                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label mb-md-1 openSans-400"  style={{ color: '#8f9bb9' }}>
                    About
                  </label>
                  <textarea
                    type="text"
                    className="form-control openSans-600"
                    placeholder='Tell your story'
                    style={{ border: '1px solid #CACED8' }}
                    name="about"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                    rows={6}
                  />
                </div>
        </div>
        <div className="col mx-2">
        <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label openSans-400 mb-md-1"  style={{ color: '#8f9bb9' }}>
                    Website
                  </label>
                  <input
                    type="text"
                    className="form-control openSans-600"
                    placeholder='Website'
                    style={{ border: '1px solid #CACED8' }}
                    name="website"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label openSans-400 mb-md-1"  style={{ color: '#8f9bb9' }}>
                    Instragram
                  </label>
                  <input
                    type="text"
                    className="form-control openSans-600"
                    placeholder='Instragram'
                    style={{ border: '1px solid #CACED8' }}
                    name="instragram"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label openSans-400 mb-md-1"  style={{ color: '#8f9bb9' }}>
                    Facebook
                  </label>
                  <input
                    type="text"
                    className="form-control openSans-600"
                    placeholder='Facebook'
                    style={{ border: '1px solid #CACED8' }}
                    name="facebook"
                    onChange={handleChange}
                    id="exampleFormControlInput1"
                  />
                </div>
        </div>
     </div>

     <button className='btn text-white rounded-pill mt-md-4 openSans-600 px-4' 
    onClick={update}
    style={{background:'#8f9bb9'}}>Save</button>


        </div> 
      </div>
    </div>
  </div>
  
  )
}

export default PublicProfile