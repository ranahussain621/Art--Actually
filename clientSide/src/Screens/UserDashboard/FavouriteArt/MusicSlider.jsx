import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Con from '../../../assets/images/cardImage1.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { DeleteFvrtArts, getFvrtArts } from '../../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../../../redux/axios/axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {toast} from 'react-toastify'
import Tooltip from '@mui/material/Tooltip';

export default function MusicSlider() {

    const user = JSON.parse(localStorage.getItem("user"))
    const userID = user?.user[0]?._id

    const [FvrtArt,setFvrtArt] = useState([])

    const FvrtArtWork = useSelector((state)=>state.auth.FvrtArts)

    const dispatch = useDispatch()

    useEffect(()=>{
      const getData = async () =>{ 
        await dispatch(getFvrtArts({user_id:userID }))
      }
      getData()
    },[userID,dispatch])


useEffect(()=>{
  if(FvrtArtWork?.data){
    setFvrtArt(FvrtArtWork?.data)
  }
},[FvrtArtWork])


const deleteFvrt = async (item) => {
  await dispatch(DeleteFvrtArts({  id:item.id_for_delete  }))
  .then(async (res)=>{
    toast(res.payload?.message,{
      autoClose:1000
    })
    await dispatch(getFvrtArts({   user_id:userID }))
  })
 }


  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       
        <div className='row'>
      {
        FvrtArt?.sounds?.map((item,i)=>{
      
          return (
            
        <>
        
        <SwiperSlide key={i} slidesPerView={3} >
            <div className="col col-xl-4 col-lg-4  col-md-4 mb-4 mt-4" >
            <div className="card"  style={{borderRadius:'15px', boxShadow:"  0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}} >
            <img className="card-img-top" src={item.image ?  item.image[0] : Con} alt="Card cap" style={{height:'250px'}}/>
            
              
              <div className="filter-content ps-3">
<div className="card-body">
          <div className="d-flex align-items-center ps-3">
            <div className="row text-muted">
                    <h6 style={{fontWeight:'700',fontFamily:'Inter',textTransform:"capitalize"}}>
                      {item.title}
                    </h6>
                </div>
                <div className="div ps-5">
     <Tooltip title="Delete From Favorite" arrow>
        <FavoriteIcon
          onClick={() => deleteFvrt(item)}
          style={{ color: 'red', outline: 'filled', cursor: 'pointer' }}
          className="fs-3 ms-4"
        />
      </Tooltip>
     </div>
          </div>
               
                <div className="row mt-2">
                  <audio src={item.file ? item?.file[0] : ''} controls />
             </div> 

</div>
</div>
</div>
            </div>
          
             </SwiperSlide>
        </>
           
        
          )
        })
      }
      
        </div> 
      
        
       
      </Swiper>
    </>
  );
}
