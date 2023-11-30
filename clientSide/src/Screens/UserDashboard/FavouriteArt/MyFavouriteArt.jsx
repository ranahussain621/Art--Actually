import React from 'react'
import '../../../Styles/contact-us.css'
import blogbar from "../../../assets/images/banner.png"


import {faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from './ArtSlider'
import MusicSlider from './MusicSlider'
import { useSelector } from 'react-redux';

function MyFavouriteArtGallery() {

  
    const FvrtArts = useSelector((state)=>state.auth.FvrtArts)
    const {isLoading} = useSelector((state)=>state.auth.FvrtArts)


  return (
    < >
       <div style={{
  backgroundImage: `url(${blogbar})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '110px' 
}}>
  {/* Content */}
</div>
     
    <div className="container-fluid my-4"    style={{ fontFamily: "initial", color: "cadetblue", backgroundColor:"#EDEBEA" }}>   
      <div className="ms-4 my-4">
               <h2 className='ms-5' style={{fontFamily:'inter' , color:'#6896a1',fontWeight:'700'}}>My Favourite Art Actually</h2>
      </div>
        <div className="row justify-content-center  mx-4" style={{alignItems:"center",  backgroundColor:'#fefefe',
        marginLeft:"2px", marginRight:"2px", borderRadius:'15px', boxShadow:"  0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",  }}>
     <div style={{textAlign:"end", paddingTop:"8px"}}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
     </div>
        <div className="col-md-3 col-sm-12">
       <h4 style={{ fontSize:"20px", fontWeight:"600", color:"#709AA4",fontFamily:'inter'}}>Chosen folder Name from ABCDE</h4>
       <p style={{ fontSize:"16px", fontWeight:"600", color:"#709AA4",fontFamily:'inter'}}>{FvrtArts?.data?.arts?.length} Items</p>
        </div>

        <div className="col-md-8 col-sm-12" >
          { isLoading ? 
              (<div class="spinner-grow text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>)
            : <Slider />
          }
             
        </div>
     
        </div>
      
        {/* <div className="container-fluid row justify-content-around" style={{alignItems:"center",  padding:"8px",
         marginLeft:"2px", marginRight:"2px", marginTop:"4px", borderRadius:'15px', boxShadow:"  0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", backgroundColor:"#ffff" }}>
     <div style={{textAlign:"end", paddingTop:"8px"}}>
      <FontAwesomeIcon icon={faEllipsisVertical} />
     </div>
        <div className="form col-xl-3 col-lg-2  col-md-2 ">
          <div className='container'>
     
       <div className="para">
       <h4 style={{ fontSize:"24px", fontWeight:"400", color:"#709AA4"}}>Favorite Music</h4>
       <p style={{ fontSize:"18px", fontWeight:"400", color:"#709AA4"}}>{FvrtArts?.data?.sounds?.length} items</p>
       
       </div>
      
       </div>
        </div>
        <div className="col-xl-7 col-lg-7 col-md-8  " >
        {
            isLoading ? 
              (<div class="spinner-grow text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>)
            :  <MusicSlider />
          }
        
        </div>
      
        </div> */}

    </div>

    </>
  )
}

export default MyFavouriteArtGallery
