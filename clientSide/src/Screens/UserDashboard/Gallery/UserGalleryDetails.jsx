import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faXmark } from "@fortawesome/free-solid-svg-icons";
import { getArtDetails } from '../../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { baseURL } from '../../../redux/axios/axios';


const UserGalleryDetails = ({closeWindow,title,description,image,artId}) => {

     const [data,setData] = useState([])

    const dispatch = useDispatch()
     useEffect(()=>{
        const getData = async () =>{
           
           const data = await dispatch(getArtDetails({ id:artId }))
           setData(data.payload.data);
        }
        getData()
     },[artId,dispatch])


  return (
    <div className="row gallery-details-container mb-4">
         <div className="d-flex align-items-center" >
            <h3 className="my-3 w-100" style={{fontWeight:'400',letterSpacing:"0.9",color:'#709AA4'}}>Art Details</h3>
            <div className='justify-content-end' onClick={closeWindow}>
            <FontAwesomeIcon icon={faXmark} className='fs-3' />
        </div>
        </div>
      
    <div className="col-md-6 col-sm-12 text-center">
        <div style={{background:'rgb(240,239,237)' ,}}>  
     <img className='img-fluid p-0 w-100' src={image[0]} alt={title} style={{height:'400px'}} />
        </div>
    </div>
    <div className="col-md-6 col-sm-12 ps-4 pt-4">
        <div className="row">
            <h2 style={{fontWeight:'400',textTransform:"capitalize"}}>
               {title} - <span style={{textTransform:"capitalize"}} className='text-muted'>
                   {data?.artist}
                </span>
            </h2>
        </div>
        <div className="row">
            <h4 style={{fontWeight:'400'}}>
                Printing / Pop Art
            </h4>
        </div>
        <div className="row pt-2 text-muted">
            <p style={{textJustify:'center' ,textTransform:"capitalize"}}>
                {description}              
            </p>
        </div>

       



        <div className="row">
            <h6 style={{fontWeight:'700'}}>
                Format
            </h6>
        </div>
        <div className="row">
            <h6 className="text-muted" style={{fontWeight:'400',textTransform:"capitalize"}}>
                {data?.format_title}
            </h6>
        </div>

        <div className="row pt-2">
            <h6 style={{fontWeight:'700'}}>
                Style
            </h6>
        </div>
        <div className="row">
            <h6 className="text-muted" style={{fontWeight:'400',textTransform:"capitalize"}}>
               {data?.style_title}
            </h6>
        </div>
   
   
    </div>
</div>
  )
}

export default UserGalleryDetails