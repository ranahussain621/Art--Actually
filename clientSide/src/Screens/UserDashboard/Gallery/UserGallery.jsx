import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import '../../../Styles/uploadart.css'

import { useSelector, useDispatch } from "react-redux";
import { getUserArts } from "../../../redux/features/auth/authSlice";
import UserGalleryDetails from "./UserGalleryDetails";
import { baseURL } from "../../../redux/axios/axios";

const UserGallery = ({ searchInput }) => {


  const user = JSON.parse(localStorage.getItem("user"));
  const _id = user?.user[0]?._id;

  const [ArtDetailsOpen, setArtDetailsOpen] = useState(false);
  const [selectedArtItem, setSelectedArtItem] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [data,setData] = useState([])
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const userGallery = useSelector((state) => state.auth.userArt.userGallery);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserArts({ user_id: _id }));
    };
    getData();
  }, []);

  useEffect(() => {
    if (userGallery?.data) {
      setData(userGallery?.data);
      setFilteredData(userGallery?.data); // Initialize filtered data with all data
      setCurrentPage(1);
    }
  }, [userGallery]);


  useEffect(() => {
    if (!searchInput) {
      setFilteredData(data)
      setCurrentPage(1)
      return
    }},[data,searchInput])

  useEffect(() => {
    if (searchInput) {
      const filter = data?.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );

      setFilteredData(filter);
      setCurrentPage(1);
    }
  }, [data, searchInput]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    setTotalPage(totalPages);
  }, [filteredData, itemsPerPage]);

  // Logic to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  const ArtDetailsScreen = (item) => {
    setArtDetailsOpen(!ArtDetailsOpen);
    setSelectedArtItem(item);
  };

 

  
    


  return (
    <>
      <div className="container-fluid ps-4 mb-3">
        <div className="row">
       
          <div className="row">
            <h4
              className=""
              style={{
                fontWeight: "400",
                letterSpacing: "0.9",
                color: "#709AA4",
              }}
            >
              Painting Gallery
            </h4>
          </div>

          <div className="row">
            {currentItems?.length > 0 ? ( 
              currentItems?.map((item, i) => {


                
                const descriptionWords = item.description.split(' ');
                const Description = descriptionWords.slice(0,2).join(' ');
        
               

                return (
                  <div className="col-md-3 col-sm-6 pe-0 m-0 rana pt-3" style={{borderRadius:'15px'}} key={i}>
                  <div className="card shadow rounded-3" style={{background:'#f7eeee4a'}}>
                  
                   <img className='rounded-top' src={item.image[0]} alt="No Data" style={{height:'255px'}} />
                  
                  <div className="d-flex align-items-center card-body" style={{padding:"0.5rem"}}>
                    <div className="col-md-7 col-sm-6">
                    <div className="row pt-2">
                              <h6 style={{fontWeight:'600',textTransform:"capitalize"}}>
                                  {item.title}
                              </h6>
                          </div>
                          <div className="row">
                              <h6 style={{fontWeight:'500',color:'#709AA4',textTransform:"capitalize"}}>
                                  {Description}
                              </h6>
                          </div> 
                        
                           </div>
                    <div className="col-md-5" onClick={()=>ArtDetailsScreen(item)}>
                      <p className='pt-2' style={{display: 'inline-block', borderBottom:'2px solid grey',color:'#709AA4'}}>View Details</p>
                    </div></div>
                    
                  </div>

                  {
  ArtDetailsOpen && selectedArtItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <UserGalleryDetails
          closeWindow={() => setArtDetailsOpen(false)}
          title={selectedArtItem.title}
          description={selectedArtItem.description}
          image={selectedArtItem.image}
          artId={item._id}
        /> 
      </div>
    </div>
  )
}
                            
                          </div>
                );
              })
            ) : 

            UserGallery?.data?.length > 0 ? ( 
              UserGallery?.data?.map((item, i) => {
              
                const descriptionWords = item.description.split(' ');
                const Description = descriptionWords.slice(0,2).join(' ');
                return (
                  <div className="col-md-3 col-sm-6 pe-0 m-0 rana pt-3" style={{borderRadius:'15px'}} key={i}>
                  <div className="card shadow rounded-3" style={{background:'#f7eeee4a'}}>
                  
                   <img className='rounded-top' src={item?.image[0]} alt="No Data" style={{height:'255px'}} />
                  
                  <div className="d-flex align-items-center card-body" style={{padding:"0.5rem"}}>
                    <div className="col-md-7 col-sm-6">
                    <div className="row pt-2">
                              <h6 style={{fontWeight:'600',textTransform:"capitalize"}}>
                                  {item.title}
                              </h6>
                          </div>
                          <div className="row">
                              <h6 style={{fontWeight:'500',color:'#709AA4',textTransform:"capitalize"}}>
                                  {Description}
                              </h6>
                          </div> 
                        
                           </div>
                    <div className="col-md-5" onClick={()=>ArtDetailsScreen(item)}>
                      <p className='pt-2' style={{display: 'inline-block', borderBottom:'2px solid grey',color:'#709AA4'}}>View Details</p>
                    </div></div>
                    
                  </div>

                  {
  ArtDetailsOpen && selectedArtItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <UserGalleryDetails
          closeWindow={() => setArtDetailsOpen(false)}
          title={selectedArtItem.title}
          description={selectedArtItem.description}
          image={selectedArtItem.image}
        /> 
      </div>
    </div>
  )
}
                            
                          </div>
                );
              })
            )
            
            
            : (
              <div
                className="fs-5 ps-5 pt-5 ms-5"
                style={{ color: "rgb(112, 154, 164)" }}
              >
                
                No Data Found
              </div>
            )}
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-md-auto">
              <Pagination style={{zIndex:"0"}} className="">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="p-2 " />
                </Pagination.Prev>

                {Array.from({ length: totalPage }, (_, index) => (
                  <Pagination.Item
                    className="ps-3"
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    <div className="p-2">{index + 1}</div>
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  className="ps-3"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPage}
                >
                  <FontAwesomeIcon icon={faAngleRight} className="p-2" />
                </Pagination.Next>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGallery;
