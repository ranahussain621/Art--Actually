import React, { useEffect, useState } from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddFvrtArts, getAllArts, getFvrtArts } from "../../redux/features/auth/authSlice";
import Login from "../../Screens/Login";
import { baseURL } from "../../redux/axios/axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from "react-toastify";
import Tooltip from '@mui/material/Tooltip';


const GalleryPage = () => {

  const USER = JSON.parse(localStorage.getItem("user"));
  const [planId, setplanId] = useState()
  const [styId, setstyId] = useState()
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");


  const [filter, setFilter] = useState({
    title: "",
    style: "",
    format: "",
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  const userList = useSelector((state) => state.auth.allArts);
  
  const {isLoading} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllArts());
    };

    getData();
  }, [dispatch,filter]);

  const searchData = () => {
    const filteredData = userList?.data?.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descriptionMatch = item.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return titleMatch || descriptionMatch;
    });
    setData(filteredData);
  };

  const handleSearch = () => {
    searchData();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
 
  

  useEffect(() => {

    if (filter?.format|| filter.style) {
      const sendFilterBackend = async () => {
         await dispatch(getAllArts(filter));
      };
      sendFilterBackend();
    }
   
  }, [filter,dispatch]);

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const detailsPage = (item) => {
    navigate("/art-details", { state: { id: item._id, image: item.image } });
  };

  const donatePage = (item) => {
    if (USER) {
      const queryParams = new URLSearchParams({
        art_id: item?._id,
      });

      navigate(`/donate?${queryParams}`, {
        state: {
          title: item.title,
          description: item.description,
          image: item.image,
          art_id: item?._id,
          user_id: item?.owner_id,
        },
      });
    }
    if (!USER) {
      setShowLoginModal(true);
    }
  };


  const FavoriteArtWork = async (item)=>{
    if (!USER) {
      setShowLoginModal(true);
    }
 if(USER){
  const data =await dispatch(AddFvrtArts({
    art_id:item?._id,
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
        style={{ backgroundColor: "white", color: "#709BA5" }}
      >
        <div className="container">
          <div className="row pt-3">
            <div
              className="col-md-3 col-lg-2 me-md-5 me-sm-0 pt-3"
              style={{
                // paddingTop: "30px",
                position: "relative",
                //  margin :"1.5rem",
                border: "1px solid #EEECEB",
                height: "450px",
                boxShadow: "5px 0px 3px #3c3c3c",
                borderRadius: "12px",
              }}
            >
              <aside className="col-sm-3   pe-0  w-100">
                <div className="">
                  <article
                    className="card-group-item text-muted"
                    style={{ fontWeight: "700" }}
                  >
                    <header className="card-header d-flex py-3">
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="bi bi-funnel"
                          width="18"
                          height="18"
                          fill="#709BA5"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                        </svg>
                      </div>
                      <h6
                        className="title ps-1 pb-0 mb-0 pt-1"
                        style={{
                          fontSize: "18px",
                          color: "#709BA5",
                          fontWeight: "400",
                        }}
                      >
                        Filters{" "}
                      </h6>
                    </header>

                    <header
                      className="card-header border-bottom-0 mt-3 pb-0"
                      style={{ background: "transparent" }}
                    >
                      <h6
                        className="title mb-2"
                        style={{
                          fontSize: "18px",
                          color: "#709BA5",
                          fontWeight: "400",
                        }}
                      >
                        Format{" "}
                      </h6>
                    </header>
                    <div className="filter-content ps-3 mt-1">
                      <div className="card-body">
                        <form>
                          {userList?.formates?.map((format, i) => {
                            return (
                              <label className="form-check" key={i}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  style={{ border: " 1px solid #180d07" }}
                                  value={planId}
                                  checked={planId ===format._id}

                                  onChange={(e) => {

                                    if (planId === format._id) {
                                      // If the same row's checkbox is clicked again, uncheck it
                                      setplanId(null);
                                    } else {
                                      // If a different row's checkbox is clicked, update the planId state
                                      setplanId(format._id);
                                    }

                                    const { value, checked } = e.target;
                                    if (checked) {
                                      setFilter((prevState) => ({
                                        ...prevState,
                                        // title: value,
                                        format: format._id,
                                      }));
                                    } else {
                                      setFilter((prevState) => ({
                                        ...prevState,
                                        title:
                                          prevState.format === format._id
                                            ? ""
                                            : prevState.title,
                                        format:
                                          prevState.format === format._id
                                            ? ""
                                            : prevState.format,
                                      }));
                                    }
                                  }}
                                />

                                <span
                                  className="form-check-label"
                                  style={{
                                    fontSize: "14px",
                                    color: "#709BA5",
                                    fontWeight: "500",
                                  }}
                                >
                                  {format.title}
                                </span>
                              </label>
                            );
                          })}
                        </form>
                      </div>
                    </div>
                  </article>

                  <hr style={{ opacity: "0.2" }} />

                  <article
                    className="card-group-item text-muted mb-3"
                    style={{ fontWeight: "700" }}
                  >
                    <header
                      className="card-header border-bottom-0  pb-0"
                      style={{ background: "transparent" }}
                    >
                      <h6
                        className="title mb-2 pb-0"
                        style={{
                          fontSize: "18px",
                          color: "#709BA5",
                          fontWeight: "400",
                        }}
                      >
                        Style{" "}
                      </h6>
                    </header>
                    <div className="filter-content ps-3 mt-1">
                      <div className="card-body">
                        <form>
                          {userList?.styles?.map((style, i) => {
                            return (
                              <label className="form-check" key={i}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  style={{ border: " 1px solid #180d07" }}
                                  value={styId}
                                  checked={styId === style._id}
                                  onChange={(e) => {

                                    if (styId === style._id) {
                                      // If the same row's checkbox is clicked again, uncheck it
                                      setstyId(null);
                                    } else {
                                      // If a different row's checkbox is clicked, update the planId state
                                      setstyId(style._id);
                                    }


                                    const { value, checked } = e.target;
                                    if (checked) {
                                      setFilter((prevState) => ({
                                        ...prevState,
                                        //  title: value,
                                        style: style._id,
                                      }));
                                    } else {
                                      setFilter((prevState) => ({
                                        ...prevState,
                                        // title: prevState.style === style._id ? "" : prevState.title,
                                        style: prevState.style === style._id  ? "" : prevState.style,
                                      }));
                                    }
                                  }}
                                />

                                <span
                                  className="form-check-label"
                                  style={{
                                    fontSize: "14px",
                                    color: "#709BA5",
                                    fontWeight: "500",
                                  }}
                                >
                                  {style.title}
                                </span>
                              </label>
                            );
                          })}
                        </form>
                      </div>
                    </div>
                  </article>
                </div>
              </aside>
            </div>

            <div className="col-md-8 col-lg-9 col-sm-12 col-12 pb-3">
              <div className="row">
                {/* {Art Cards Fetching Dynamically} */}

                {isLoading ? (
                 <div class="d-flex justify-content-center">
                 <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
                   <span class="sr-only">Loading...</span>
                 </div>
               </div>
                ) : data?.length > 0 ? (
                  data?.map((item, i) => {
                    // getting image from backend
                    const imagesData = item.image[0];
                    const descriptionWords = item.description.split(" ");
                    const Description = descriptionWords.slice(0, 2).join(" ");
                    return (
                      <div
                        className="col-md-4 col-sm-6 pe-0 m-0 rana mt-3"
                        style={{
                          borderRadius: "15px",
                        }}
                        key={i}
                      >
                        <div
                          className="card "
                          style={
                            {
                              // width: "19.5rem",
                            }
                          }
                        >
                          <img
                            className="card-img-top"
                            src={item?.image ? imagesData : "No User Exist"}
                            alt="Not data"
                            style={{ height: "280px" }}
                            onClick={() => detailsPage(item)}
                          />

              <div className="p-2 d-flex align-items-center">
                            <div className="col-md-4">
                              <h6
                                className="p-0"
                                style={{
                                  fontWeight: "400",
                                  color: "#000000",
                                  fontSize: "14px",
                                  lineHeight: "16.94px",
                                  textTransform:"capitalize"
                                }}
                              >
                                {item.title ? item.title : "No User Exist"}
                              </h6>
                         

                              {/* <h6
                                className="p-0"
                                style={{
                                  fontWeight: "400",
                                  color: "#709BA5",
                                  fontSize: "14px",
                                  lineHeight: "16.94px",
                                  textTransform:"capitalize"
                                }}
                              >
                                {Description ? Description : "No User Exist"}
                              </h6> */}
                            </div>
                            <div className="col-md-3">
                            <button className="btn btn-sm rounded"  style={{
                                  background: "#709BA5",
                                  color: "white",
                                }}  onClick={() => detailsPage(item)}>Details</button>
                            </div>
                            <div className="col-md-3 text-end">
                            {item.owner_id===USER?.user[0]?._id ?
                              ''
                              :


                                <button
                                className="btn btn-sm rounded"
                                style={{
                                  background: "#709BA5",
                                  color: "white",
                                }}
                                onClick={() => donatePage(item)}
                              >
                                Donate
                              </button>
                            }
                            </div>
                            <div className="col-md-2 text-end">
                            <Tooltip title="Add to Favorite" arrow>
                            <FavoriteBorderIcon  style={{ color: 'red', outline: 'filled', cursor: 'pointer' }} 
                            onClick={() => FavoriteArtWork(item)} />
                            </Tooltip> 
                             </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : isLoading ? (
                  <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                ) : userList?.data?.length > 0 ? (
                  userList?.data?.map((item, i) => {   
                    return (
                      <div
                        className="col-md-4 pe-0 m-0 rana mt-3"
                        style={{
                          borderRadius: "18px",
                        }}
                        key={i}
                      >
                        <div
                          className="card"
                          style={{
                            // width: "19.5rem",
                            boxShadow: "3px 2px 2px #3c3c3c",
                          }}
                        > 
                          <img
                            className="card-img-top"
                            src={item.image ? item?.image[0] : "No User Exist"}
                            alt="Not data"
                            style={{ height: "280px" }}
                            
                          />

                          <div className="p-2 d-flex align-items-center">
                            <div className="col-md-4">
                              <h6
                                className="p-0"
                                style={{
                                  fontWeight: "400",
                                  color: "#000000",
                                  fontSize: "14px",
                                  lineHeight: "16.94px",
                                  textTransform:"capitalize"
                                }}
                              >
                                {item.title ? item.title : "No User Exist"}
                              </h6>
                         

                              {/* <h6
                                className="p-0"
                                style={{
                                  fontWeight: "400",
                                  color: "#709BA5",
                                  fontSize: "14px",
                                  lineHeight: "16.94px",
                                  textTransform:"capitalize"
                                }}
                              >
                                {Description ? Description : "No User Exist"}
                              </h6> */}
                            </div>
                            <div className="col-md-3">
                            <button className="btn btn-sm rounded"  style={{
                                  background: "#709BA5",
                                  color: "white",
                                }}  onClick={() => detailsPage(item)}>Details</button>
                            </div>
                            <div className="col-md-3 text-end">
                            {item.owner_id===USER?.user[0]?._id ?
                              ''
                              :
                                <button
                                className="btn btn-sm rounded"
                                style={{
                                  background: "#709BA5",
                                  color: "white",
                                }}
                                onClick={() => donatePage(item)}
                              >
                                Donate
                              </button>
                            }
                            </div>
                            <div className="col-md-2 text-end">
                            <Tooltip title="Add to Favorite" arrow>
                            <FavoriteBorderIcon  style={{ color: 'red', outline: 'filled', cursor: 'pointer' }} 
                            onClick={() => FavoriteArtWork(item)} />
                            </Tooltip> 
                             </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-muted fs-3">No Data Found</div>
                )}
              </div>
            </div>

            {showLoginModal && <Login handleClose={closeLoginModal} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
