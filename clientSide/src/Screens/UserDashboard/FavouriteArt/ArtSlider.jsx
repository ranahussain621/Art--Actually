import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Con from '../../../assets/images/cardImage1.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {toast} from 'react-toastify'
import Tooltip from '@mui/material/Tooltip';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';
import { Pagination, Navigation } from 'swiper/modules';

import { DeleteFvrtArts, getFvrtArts } from '../../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ArtSlider() {

  const [swiperRef, setSwiperRef] = useState(null);

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

     const [isScreenLessThan992, setIsScreenLessThan992] = useState(window.innerWidth < 992);

     // Create a function to update the state based on screen width
     const updateScreenSize = () => {
       setIsScreenLessThan992(window.innerWidth < 992);
     };

     useEffect(() => {
      window.addEventListener('resize', updateScreenSize);
      return () => {
        window.removeEventListener('resize', updateScreenSize);
      };
    }, []);
  


  return (
    <>
       <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={isScreenLessThan992 ? 2 : 3}
        
        centeredSlides={true}
        spaceBetween={10}
       
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
      
           
              
               
       {FvrtArt?.arts?.map((item, i) => {
              // const descriptionWords = item.description?.split(" ");
              // const Description = descriptionWords?.slice(0, 4)?.join(" ");
              return (
                <>
                <SwiperSlide slidesPerView={3} spaceBetween={10} className='justify-content-start text-start'>
     
                <div className="card col-md-4 col-sm-12 mb-4 mt-4 w-100 " key={i} style={{ borderRadius: '15px', boxShadow: "  0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                  <div className="" >
                    <img className="card-img-top" src={item.image ? item.image[0] : Con} alt="Card cap" style={{ height: '250px' }} />

                    <div className="filter-content ps-3">
                      <div className="card-body d-flex align-items-center h-100">
                        <div className="div">
                          <div className="row text-muted text-start pt-2">
                            <h6 className='' style={{ fontWeight: '700', fontFamily: 'Inter', textTransform: "capitalize" }}>
                              {item.title}
                            </h6>
                          </div>

                          <div className="row ">
                            <h6 className='text-start' style={{ fontWeight: '600', fontFamily: 'Inter',}}>
                              {/* {Description} */}
                              by {`BobbySOSSEN`}
                            </h6>
                          </div>
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
                    </div>
                  </div>
                </div>
  
                 </SwiperSlide> 
            
                </>
            
              );
            })} 
         
       
       
      </Swiper>
    </>
  );
}
