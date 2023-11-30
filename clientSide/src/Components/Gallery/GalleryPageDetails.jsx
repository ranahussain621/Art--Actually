import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import {  getArtDetails, getUserArts } from '../../redux/features/auth/authSlice'
import { baseURL } from '../../redux/axios/axios'

import MessageIcon from '@mui/icons-material/Message';
import Login from '../../Screens/Login'
const GalleryPageDetails = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const location = useLocation();

  let artId = location.state?.id;


  
 


  let login = JSON.parse(localStorage.getItem('user'));
 const user_id = login?.user[0]._id;
  


    const [data,setData] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [ArtDetail, setArtDetail] = useState()
    const {userList} = useSelector((state)=>state.auth)
   

 const dispatch = useDispatch()
 const navigate = useNavigate()

 const closeLoginModal = () => {
  setShowLoginModal(false);
};


const owner_id = ArtDetail?.owner_id;

const getDetail = async () => {
  const val = await dispatch(getArtDetails({ id:artId }));
  const artData = val.payload.data;
  setArtDetail(artData);
};

const getUserArtsData = async () => {
  if (owner_id) {
    const val = await dispatch(getUserArts({ user_id: owner_id }));
    const userData = val.payload.data;
    setData(userData);
  }
};



useEffect(() => {
  getDetail();
}, [artId]);

useEffect(() => {
  getUserArtsData();
}, [owner_id]);



  


    
  
  
      const searchData = () =>{
  
       
        const filteredData = userList?.arts?.data?.filter((item) => {
          const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
          const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
          return titleMatch || descriptionMatch;
        });
         setData(filteredData);
        
      }
  
   
  
    const handleSearch = () =>{
      searchData()
    }

    const detailsPage = async (item) => {
      
      navigate("/art-details", { state: { id:item._id } });
      await dispatch(getArtDetails({id:item._id}))
    };

    
const MoveToMessageScreen=()=>{
  
  if(!login){
    setShowLoginModal(true);
    
  }else{
    navigate('/dashboard/user-dashboard',{ state: { eventKey: "sixth", user_id:owner_id } })
   

  }

}


  return (
   <>

    <div
        className="col text-center background-image"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',
         
        
        }}
      >
        <div className="container" style={{ borderRadius: '0 20px 20px 0'}}>
          <div className="row justify-content-center"  >
            
            <div className="col-6 ps-0">
              <div className="input-group mb-3">
              <input
            type="text"
           className="form-control text-muted border-0 inputt"
              placeholder="Search ..."
           aria-label="Recipient's username"
           aria-describedby="basic-addon2"
           value={searchQuery}
           onChange={(e) =>
            
            setSearchQuery(e.target.value)

           
          }
                />
                <div className="input-group-append border-0 pt-1 text-center text-light" 
                 onClick={handleSearch} style={{ width: '50px', background: '#719DA8'}}>
             
               <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid" style={{backgroundColor: "#f5f5f5",}}>
        <div className="row mb-5"  >
        <div className="col-md-6 col-sm-12 d-flex  justify-content-center align-items-center" style={{ position: "relative" ,   }}>
 
  <div className="">
      <img
    className=" img-fluid ps-4 pe-4 pt-4"
    src={ArtDetail?.image ? ArtDetail?.image[0] : "No User Exist"}
    alt="No data"
    style={{ maxHeight: "500px", position: "relative", top: 0, left: 0, right: 0, bottom: 0,  }}
  />
  </div>

</div>

            <div className="col-md-6 col-sm-12 ps-5 pt-4">
                <div className=" d-flex">
                  <div className='d-flex w-100'>
                    <h2 style={{fontWeight:'600', fontSize:"22px", color:"#000000" ,textTransform:"capitalize"}}>
                       {ArtDetail?.title}
                        - <span style={{textTransform:"capitalize"}} className='text-muted'>
                            {ArtDetail?.artist}
                        </span>
                    </h2>
                  </div>
                    
                    <div className='w-100 text-end px-4'>
                      {}
                      <button
                      disabled={ArtDetail?.owner_id===user_id}
                      className='btn shadow ' onClick={MoveToMessageScreen}>
                        <MessageIcon 
                        style={{
                          fontSize:'40px',
                          color:'#4c6a71'
                        }}
                        />
                        </button>

                        {showLoginModal && <Login handleClose={closeLoginModal} />}
                    </div>
                </div>
                <div className="row">
                    <h4 style={{fontWeight:'400', fontSize:"18px", color:"#000000"}}>
                        Printing / Pop Art 
                    </h4>
                </div>
                <div className="row pt-4 mt-2 mb-2">
                    <p style={{fontWeight:'400', fontSize:"16px", color:"#000000" ,textTransform:"capitalize"}}>
                      {ArtDetail?.description ? ArtDetail?.description : "No User Exist"}
                    </p>
                </div>

               



                <div className="row">
                    <h6 style={{fontWeight:'700'}}>
                        Format
                    </h6>
                </div>
                <div className="row text-muted">
                    <h6 style={{fontWeight:'700',textTransform:"capitalize"}}>
                       {ArtDetail?.format_title}
                    </h6>
                </div>

                <div className="row pt-2">
                    <h6 style={{fontWeight:'700'}}>
                        Style
                    </h6>
                </div>
                <div className="row text-muted">
                    <h6 style={{fontWeight:'700',textTransform:"capitalize"}}>
                       {ArtDetail?.style_title}
                    </h6>
                </div>
              
            </div>
        </div>



        <div className="row  m-0" style={{background:'rgb(240,238,236)'}}>
        <div className="row ps-4 pt-4 ">
                 
                    <h2 style={{fontWeight:'400', fontSize:"36px"}}>
                        More From <span style={{color:"#709DA7",textTransform:"capitalize"}} className='text-muted' >
                            {ArtDetail?.artist ? ArtDetail?.artist : "No User Exist"}
                        </span>
                    </h2>
                </div>


                {
                data?.length > 0 ? 
        data?.map((item,i)=>{
              
              
                  return (
                    <div className="col-md-3 pe-0 m-0 rana py-3 text-center " style={{borderRadius:'15px'}} key={i}>
                    <div className="card shadow rounded-3" style={{width: '22rem'}} >
        
                    <img className='rounded-top' src={item.image ? item.image[0] : "No User Exist"} alt="Not data" style={{height:'255px'}} />

        
                   <div className="card-body row">
                      <div className="col-md-6 text-start">
                                <h6 style={{fontWeight:'700',textTransform:"capitalize"}}>
                                    {item.title ? item.title : "No User Exist"}
                                </h6>
                            </div>
                            <div className="col-md-6">
                            <button className="btn btn-sm rounded"  style={{
                                  background: "#709BA5",
                                  color: "white",
                                }}  onClick={() => detailsPage(item)}>Details</button>
                           
                                {/* <h6 style={{fontWeight:'700',color:'#709BA5',textTransform:"capitalize"}}>
                                    {Description ? Description : "No User Exist"}
                                </h6> */}
                            </div> 
                             </div>
            </div>
                              
                            </div>
                  )
                 }) :  
                 userList?.arts?.data?.map((item,i)=>{
                  // getting image from backend  
                  const descriptionWords = item.description.split(' ');
                const Description = descriptionWords.slice(0,2).join(' ');
                   
          
                    return (
                      <div className="col-md-3 pe-0 m-0 rana py-3 text-center ms-5" style={{borderRadius:'15px'}} key={i}>
                      <div type = "button"  className="card rounded-3 shadow" style={{width: '18rem'}} onClick={()=>detailsPage(item)}>
          
                      <img className='rounded-top' src={item.image ? item.image[0] : 'No User Exist'} alt="Not data" style={{height:'255px'}} />

          
                     <div className="p-2 d-flex align-items-center ">
                        <div style={{textAlign:"start",}}>
                                  <h6 className='p-0' style={{fontWeight:'700'}}>
                                      {item.title ? item.title : 'No User Exist'}
                                  </h6>
                              
                                  <h6 className='p-0' style={{fontWeight:'700',color:'#709BA5'}}>
                                      {Description ? Description : 'No User Exist'} 
                                  </h6>
                              </div>
                              <div style={{textAlign:"end", marginLeft:"3rem"}}>
                               <button className='btn btn-sm rounded-4 ms-5' style={{background:'#709BA5',color:'white'}}>Donate</button>
                               </div>
                                </div>
              </div>
                                
                              </div>
                    )
                   }) 
                
           }
        </div>
      </div>


   </>
  )
}

export default GalleryPageDetails