import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Blog.css"
import { useDispatch, useSelector } from "react-redux";
import { ListOfBlogs } from "../../redux/features/auth/PaymentSlice";

const BlogPostOne = () => {

  const {blogList,isLoading} = useSelector((state)=>state.payment)

  const [searchQuery, setSearchQuery] = useState("");
  const [data,setData] = useState([])

  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(ListOfBlogs({}))
  },[dispatch])
 
const navigate = useNavigate()


const searchData = () => {
  const filteredData = blogList?.data?.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descriptionMatch;
  });
  setData(filteredData);
};

const printingDataFun=async()=>{
  dispatch(ListOfBlogs({cat_id:"64fef7072efb48a582a626e2"}))
}
const AllDataFun=async()=>{
  dispatch(ListOfBlogs({}))
}
const MusicDataFun=async()=>{
  dispatch(ListOfBlogs({cat_id:"64fef73f2efb48a582a626e8"}))
}
const installationDataFun=async()=>{
  dispatch(ListOfBlogs({cat_id:"64fef71c2efb48a582a626e5"}))
}
const showDetailBlog=(id) => {
 
  navigate('/blog/allpost', { state: { id: id } })
}

  return (
    <>
      <div
        style={{ backgroundSize: "cover", backgroundPosition: "center",backgroundRepeat: "no-repeat",height: "500px",
          backgroundImage: `url('https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
        }} >

 <div className="container" style={{ borderRadius: "0 20px 20px 0",paddingTop:'14rem' }}>
          <div className="row justify-content-center">
            <div className="col-md-6 ps-0">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control text-muted border-0 inputt"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div
                  className="input-group-append border-0 pt-1 text-center text-light"
                  style={{ width: "50px", background: "#719DA8" }}
                  onClick={searchData}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
       

      <div className="container-fluid bg-light">

    <div className="row justify-content-center" >
      <div className="col-xl-9 col-md-8 col-sm-7 col-6">
        <div className="row">
           {isLoading ?
           <div class="d-flex justify-content-center mt-4">
           <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
             <span class="sr-only">Loading...</span>
           </div>
         </div>
           :
           data?.length>0 ?
           data?.map((item,i)=>{

            const timestamp = Number(item.date); // Your timestamp here
            const monthNames = [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
              'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
            ];
            
            const date = new Date(timestamp); // Replace this with your date
            
            const month = monthNames[date.getMonth()]; // Get the month name
            
            const day = String(date.getDate()).padStart(2, '0');
         
            
          return(
          <>
           <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3"  key={i}>
          <h3 className="my-3 card-Date" style={{ fontWeight: "500" }}>
                 {day} <br />
                  <span
                    style={{ fontSize: "26px", }}
                  >
                   {month}
                  </span>
                </h3>
          </div>
          <div className="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-9 border-bottom">
          <div className="links-card row justify-content-center"  style={{
            backgroundColor:'#fefefe',
            height:'100%'
          }}>
                     <div className="col-xl-7 col-lg-7 col-md-6 col-sm-9 col-9">
                      <div className="d-flex">
                          {item.categories?.map((item)=>{
                        return(
                            <div className="my-3 mx-2" style={{color:'#709CA6',textTransform:"capitalize"}}>{item}</div>
                        )
                      })}
                      </div>
                    
                  
                    <div className="link-card-title" style={{textTransform:"capitalize"}}>{item.title}</div>
                    <div className="my-2" style={{color:'#B9CDD0' ,textTransform:"capitalize"}}>
                  {item.description}
                    </div>
                    <div style={{marginTop:"4rem"}}>
                  
                    <span className="read" onClick={()=>showDetailBlog(item._id)} style={{float:'right',color:'#709CA6',cursor:'pointer',textTransform:"capitalize"}}>
                      READ MORE....
                    </span>
                    </div>
                     </div>
                     <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-6 p-0 d-flex justify-content-center">
                      <img className="img-fluid" src={item?.image[0]} style={{
                     width:"350px",
                     height:'280px'
                      
                      }} alt="" />
                     </div>
                  </div>
          </div>
         
          </>
         
       
          )
        })
      :
      blogList?.data?.length>0 ?
      blogList?.data?.map((item,i)=>{

       const timestamp = Number(item.date); // Your timestamp here
       const monthNames = [
         'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
         'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
       ];
       
       const date = new Date(timestamp); // Replace this with your date
       
       const month = monthNames[date.getMonth()]; // Get the month name
       
       const day = String(date.getDate()).padStart(2, '0');
    
       
     return(
     <>
      <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3"  key={i}>
     <h3 className="my-3 card-Date" style={{ fontWeight: "500" }}>
            {day} <br />
             <span
               style={{ fontSize: "26px", }}
             >
              {month}
             </span>
           </h3>
     </div>
     <div className="col-xl-10 col-lg-10 col-md-10 col-sm-9 col-9 border-bottom">
     <div className="links-card row justify-content-center"  style={{
       backgroundColor:'#fefefe',
       height:'100%'
     }}>
                <div className="col-xl-7 col-lg-7 col-md-6 col-sm-9 col-9">
                 <div className="d-flex">
                     {item.categories?.map((item)=>{
                   return(
                       <div className="my-3 mx-2" style={{color:'#709CA6',textTransform:"capitalize"}}>{item}</div>
                   )
                 })}
                 </div>
               
             
               <div className="link-card-title" style={{textTransform:"capitalize"}}>{item.title}</div>
               <div className="my-2" style={{color:'#B9CDD0' ,textTransform:"capitalize"}}>
             {item.description}
               </div>
               <div style={{marginTop:"4rem"}}>
             
               <span className="read" onClick={()=>showDetailBlog(item._id)} style={{float:'right',color:'#709CA6',cursor:'pointer',textTransform:"capitalize"}}>
                 READ MORE....
               </span>
               </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-6 p-0 d-flex justify-content-center">
                 <img className="img-fluid" src={item?.image[0]} style={{
                width:"350px",
                height:'280px'
                 
                 }} alt="" />
                </div>
             </div>
     </div>
    
     </>
    
  
     )
   })
      :
      <h5 className="text-muted p-5">
      No data
    </h5>
      }
        </div>
      </div>
       

           <div className="col-xl-3 col-lg-3 col-md-4 sidebar">
         
                <div className=" ps-5 mt-5">
                  <h6 className="opa mt-4"
                  style={{cursor:'pointer'}}
                    onClick={AllDataFun}>
                    {/* <NavLink to="/blog/allpost">All POSTS</NavLink> */}
                    All Post
                  </h6>
                  <h6 className="opa mt-4" style={{cursor:'pointer'}} onClick={printingDataFun}>Printing</h6>
                  <h6 className="opa mt-4"  style={{cursor:'pointer'}} onClick={MusicDataFun} >Music</h6>
                  <h6 className="opa mt-4" style={{cursor:'pointer'}}  onClick={installationDataFun}>Installation</h6>
                  
                </div>
              
          </div>
      </div> 
     
     
     
     
        

       

       

      </div> 
     
    </>
  );
};

export default BlogPostOne;
