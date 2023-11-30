import React, { useEffect, useState } from "react";
import "./music.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllSound,getAllArts, AddFvrtArts, getFvrtArts } from "../../redux/features/auth/authSlice";


import img4 from '../../assets/images/music4.png'
import MusicPageDetails from "./MusicPageDetails";
import { useNavigate } from "react-router-dom";
import Login from "../../Screens/Login";
import { baseURL } from "../../redux/axios/axios";
import {toast} from 'react-toastify'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';


const MusicPage = () => {


  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };


  const USER = JSON.parse(localStorage.getItem("user"))

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filter, setFilter] = useState({
    title: "",
    style: "",
    format: "",
  });

  // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [MusicDetailsOpen, setMusicDetailsOpen] = useState(false)

  const [selectedMusicItem, setSelectedMusicItem] = useState(null);

  const { userList,isLoading } = useSelector((state) => state.auth);


  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllArts());
      await dispatch(getAllSound())
    };

    getData();
  }, [dispatch, filter]);

  const searchData = () => {
    const filteredData = userList?.sound?.data?.filter((item) => {
      
      const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || descriptionMatch;
    });
    
    setData(filteredData);
  };


  const handleSearch = () => {
    searchData();
  };



  // const handlePlay = (audioRef) => {
  //   if (currentlyPlaying) {
  //     currentlyPlaying.pause();
  //   }
  //   audioRef.play();
  //   setCurrentlyPlaying(audioRef);
  // };


   
   
// eslint-disable-next-line react-hooks/exhaustive-deps
// const sendFilterBackend = async () =>{
//   setLoading(true);
//   await dispatch(getAllSound())
//   setLoading(false);
 
// }


//  useEffect(  ()=>{
// if(filter?.title || filter?.format || filter?.style){
  
//   sendFilterBackend()
   
// }
//  },[filter?.title ,filter?.format , filter?.style])




  const MusicDetailsScreen = (item) => {
    setMusicDetailsOpen(!MusicDetailsOpen)
    setSelectedMusicItem(item);
  }


  const donatePage = (item) => {
   
    if(USER){
      const queryParams = new URLSearchParams({
        music_id:item?._id,
      });
      
      navigate(`/donate?${queryParams}`,
       { state: { title: item.title ,
         description:item.description ,
         image:item.image ,
        music_id:item?._id,
        user_id:item?.owner_id } 
      });
     }

     if(!USER){
      setShowLoginModal(true)
  }
  }


  const FavoriteArtWork = async (item)=>{
    if(!USER){
      setShowLoginModal(true);
    }
   if(USER){
    const data =await dispatch(AddFvrtArts({
      music_id:item?._id,
      user_id:USER?.user[0]?._id
    }))
    await dispatch(getFvrtArts({
      user_id:USER?.user[0]?._id
   }))
    const res = data.payload 

    if(res.success === false){
      toast.info(res.message,{
        autoClose:1000
      })
    }
    if(res.success === true){
      toast.success(res.message,{
        autoClose:1000
      })
    }
   }
  }

  return (
    <>
      <div
        className="col text-center background-image"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "500px",
        }}
      >
        <div className="container" style={{ borderRadius: "0 20px 20px 0" }}>
          <div className="row justify-content-center">
            <div className="col-6 ps-0">
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
                  onClick={handleSearch}
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

      <div
        className="container-fluid"
        style={{ backgroundColor:"white", color:"#709BA5"}}
      >
        <div className="container">
        <div className="row pt-3">
  

          <div className="col-md-12 col-lg-12 col-sm-12 col-12 pb-3">
          
            <div className="row">
              {/* {Art Cards Fetching Dynamically} */}

              {
                isLoading ? (
                  <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                )
                :

                data?.length > 0
                  ? data?.map((item, i) => {
                      // getting image from backend
                      const titleWords = item.title.split(' ');
                      const title = titleWords?.slice(0,2).join(' ');
                      const descriptionWords = item.description.split(' ');
                      const Description = descriptionWords.slice(0,2).join(' ');
                      // const audioRef = React.createRef();
                      return (
                        <div
                        className="col-md-3 col-sm-6 pe-0 m-0 rana pb-3"
                        style={{ borderRadius: "15px" }}
                        key={i}
                      >
                        <div
                          className="card shadow rounded-4 cardss"
                          
                        >
                          <img src={item.image? item.image[0]:img4} alt="No Data" className="" style={{height:'250px'}}/>

                          <div className="row mt-1">
                          <audio
                  //  ref={audioRef}
                    src={item.file[0]}
                    controls
                    preload="none"
                    className="w-100"
                    // onPlay={() => handlePlay(audioRef.current)}
                  /> 
                          </div> 

                          <div
                            className="d-flex align-items-center card-body pt-2"
                            style={{ padding: "0.5rem", alignItems:"center" }}
                          >
                           
                              
                                <div className="col p-0 m-0 ps-2">
                                
                                <h6 style={{ fontWeight: "500" ,color:'#231F20', fontSize:"20px", lineHeight:"24px" ,textTransform:"capitalize"}}>
                                  {title}
                                </h6>
                              
                             
                                <h6 style={{ fontWeight: "500" ,color:'#709AA4', fontSize:"13px", lineHeight:"10px" , textTransform:"capitalize"}} className="">
                                  {Description}
                                </h6>
                              
                                </div>
                               
                            
                              
                             
                         
                            <div className="col-md-5 col-sm-6 text-end pe-2" type="button" onClick={()=>MusicDetailsScreen(item)}>
                              <p
                                className="pt-2"
                                style={{
                                  display: "inline-block",
                                  fontSize:"14px" ,
                                  fontWeight:"600",
                                  borderBottom: "2px solid #709AA4",
                                  color:"#709AA4"
                                }}
                              >
                                View Details
                              </p>
                            </div> 
                            
                          </div>
                        <div className="row">
                        <div className='col-md-6 text-start ps-4 mb-2'>
                              <button className='btn btn-sm rounded' 
                              type="button"
                              style={{background:'#709BA5',color:'white'}}
                               onClick={()=>donatePage(item)}
                              >Donate</button>
                              </div>
                              <div className="col-md-6 text-end pe-4">
                              <Tooltip title="Add to Favorite" arrow>
                            <FavoriteBorderIcon  style={{ color: 'red', outline: 'filled', cursor: 'pointer' }} onClick={() => FavoriteArtWork(item)} />
                            </Tooltip>
                            </div>
                        </div>
                        
                        </div>
                       {
  MusicDetailsOpen && selectedMusicItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <MusicPageDetails
          closeWindow={() => setMusicDetailsOpen(false)}
          title={selectedMusicItem.title}
          description={selectedMusicItem.description}
          image={selectedMusicItem.image}
          file={selectedMusicItem.file}
        />
      </div>
    </div>
  )
} 
                      </div>
                      );
                    })
                  :
                  userList?.sound?.data?.length > 0 ?
                  userList?.sound?.data?.map((item, i) => {
                    
                    const titleWords = item.title.split(' ');
                    const title = titleWords?.slice(0,2).join(' ');
                      const descriptionWords = item.description.split(' ');
                      const Description = descriptionWords.slice(0,2).join(' ');
                      // const audioRef = React.createRef();
                      return (
                        <div
                        className="col-md-3 col-sm-6 pe-0 m-0 rana pb-3"
                        style={{ borderRadius: "15px" }}
                        key={i}
                      >
                        <div
                          className="card shadow rounded-4 cards"
                          
                        >
                          <img src={item.image? item.image[0]:img4} alt="No Data" className="" style={{height:'250px'}} />

                          <div className="row mt-1">
                          <audio
                  //  ref={audioRef}
                    src={item.file[0]}
                    controls
                    // preload="none"
                    className="w-100"
                    // onPlay={() => handlePlay(audioRef.current)}
                  /> 
                          </div> 

                          <div
                            className="d-flex align-items-center card-body pt-2"
                            style={{ padding: "0.5rem", alignItems:"center" }}
                          >
                           
                              
                                <div className="col p-0 m-0 ps-2">
                                
                                <h6 style={{ fontWeight: "500" ,color:'#231F20', fontSize:"20px", lineHeight:"24px" ,textTransform:"capitalize"}}>
                                  {title}
                                </h6>
                              
                             
                                <h6 style={{ fontWeight: "500" ,color:'#709AA4', fontSize:"13px", lineHeight:"10px" ,textTransform:"capitalize"}} className="">
                                  {Description}
                                </h6>
                              
                                </div>
                               
                            
                              
                             
                         
                            <div className="col-md-5 col-sm-6 text-end pe-2" type="button" onClick={()=>MusicDetailsScreen(item)}>
                              <p
                                className="pt-2"
                                style={{
                                  display: "inline-block",
                                  fontSize:"14px" ,
                                  fontWeight:"600",
                                  borderBottom: "2px solid #709AA4",
                                  color:"#709AA4"
                                }}
                              >
                                View Details
                              </p>
                            </div> 
                           
                          </div>

                        <div className="row">
                        <div className='col-md-6 text-start ps-4 mb-2'>
                              <button className='btn btn-sm rounded' style={{background:'#709BA5',color:'white'}}
                               onClick={()=>donatePage(item)}
                               type="button"
                              >Donate</button>
                              </div>
                              <div className="col-md-6 text-end pe-4">
                              <Tooltip title="Add to Favorite" arrow>
                            <FavoriteBorderIcon  style={{ color: 'red', outline: 'filled', cursor: 'pointer' }} onClick={() => FavoriteArtWork(item)} />
                            </Tooltip>
                            </div>
                        </div>
                        </div>
                        {
  MusicDetailsOpen && selectedMusicItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <MusicPageDetails
          closeWindow={() => setMusicDetailsOpen(false)}
          title={selectedMusicItem.title}
          description={selectedMusicItem.description}
           image={selectedMusicItem.image}
          file={selectedMusicItem.file}
        />
      </div>
    </div>
  )
} 
                      </div>
                      );
                    })
                    : <div className="text-muted fs-3">No data Found</div>
              }
            </div>
          </div>
          {showLoginModal && <Login handleClose={closeLoginModal} />}
        </div>
        </div>
      </div>

    </>
  );
};

export default MusicPage;
