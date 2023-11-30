import React, { useEffect, useState } from "react";
import "./Allpost.css";
import cover from "../../src/assets/images/cover.png";
import modalimage from "../../src/assets/images/modalimage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGooglePlus,
  faInstagram,
  faSquareYoutube,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListOfBlogs, SingleBlog } from "../redux/features/auth/PaymentSlice";
import { baseURL } from "../redux/axios/axios";

const Allpost = () => {


  const [data,setData] = useState([])

  const [val,setVal] = useState([])

  const {isLoading} = useSelector((state)=>state.payment)

  

  const location = useLocation();
  const dispatch = useDispatch()
  const IdusingLocation = location.state?.id;

  useEffect(  ()=>{ 
   const getData = async () => {
    if(IdusingLocation){
  const res = await dispatch(SingleBlog({id:IdusingLocation}))
  setVal(res?.payload?.data);
}
   }

   getData()


  },[IdusingLocation,dispatch])


  useEffect(()=>{
    const getData = async () =>{
      const res = await dispatch(ListOfBlogs())
      setData(res.payload?.data) 
      
    }
    getData()
  },[dispatch])

 
  
  
 
  

  return (
    <>
      <div className="container-fluid allpost-bgimg">
        <img src={cover} alt="" className="bgimg" />
      </div>
      

      <div className="d-flex justify-content-center">
        {
          val?.map((item,i)=>{
           
            const timestamp = Number(item?.date); // Your timestamp here
            const date = new Date(timestamp);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];   
            const month = monthNames[date.getMonth()]; // Get the month name
            // const year = date.getFullYear();
            const day = String(date.getDate()).padStart(2, '0');
            return (
                 <div className="modal-card" key={i}>
          <div className="modal-img">
          
         <img src={item?.image ?  item?.image[0] :  modalimage} alt="" className="modal-image image-fluid" />

       
          </div>

          <div className="d-flex my-4 mx-5 align-items-center">
            <div className="date-detail">
              <span className="date">{day}</span>
              <br />
              <span className="month me-3">{month}</span>
            </div>
            <div className="details my-4 mx-4">
              {item?.categories?.map((items,i)=>{
               
                return(
                   <span className="mute-title ms-0 me-2" key={i} style={{color:'#6c757d',textTransform:"capitalize"}}>{items}</span>
                )
                
              })}
             
              <br />
              <span className="title-head" style={{textTransform:"capitalize"}}>
               {item?.title}
              </span>
            </div>
          </div>

          <div className="list-details mx-4">
            <p style={{color:'#6c757d'}}>
          {item?.description}
            </p>
         
          </div>

          <div className="d-flex justify-content-center sld my-5">
            <FontAwesomeIcon className="social-links" icon={faFacebook} />
            <FontAwesomeIcon className="social-links" icon={faInstagram} />
            <FontAwesomeIcon
              className="social-links"
              icon={faTwitterSquare}
            />
            <FontAwesomeIcon
              className="social-links"
              icon={faSquareYoutube}
            />
            <FontAwesomeIcon
              className="social-links"
              icon={faGooglePlus}
            />
          </div>
        </div>
            )
          })
        }
     
      </div>

  
      <div className=" container d-flex justify-content-center mt-1">
       
          {
             isLoading ? (
              <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
             )  : ( <div className="col-md-12">
          {data?.map((curElm,i) => {
            return (
              <>
                <div className=" col-xl-4 col-md-4 col-sm-12 col-12 my-3" key={i}>
                  <div className="links-card">
                    <div className="link-card-heasing mx-3 py-2 text-muted">
                    {curElm?.categories.map((category, j) => {
       
       return (
         <span key={j} className="category px-2 ps-0" style={{textTransform:"capitalize"}}>
         {category}
       </span>
       )
     })}

                    </div>
                    <div className="link-card-title mx-3" style={{textTransform:"capitalize"}}>{curElm.title}</div>
                    <div className="description mx-3  text-muted" style={{textAlign:'justify'}}>
                    {
                      curElm.description
                    }
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div> )
        } 
       
      </div>
  

      <div className="footers my-4">
      </div>
    </>
  );
};

export default Allpost;
