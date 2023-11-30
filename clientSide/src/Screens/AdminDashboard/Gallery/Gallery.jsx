import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import GalleryDetails from "./GalleryDetails";
import '../../../Styles/uploadart.css'


import { useSelector, useDispatch } from "react-redux";
import { getAllArts } from "../../../redux/features/auth/authSlice";
import { baseURL } from "../../../redux/axios/axios";

const Gallery = ({ searchQuery, activeTab }) => {

  const [ArtDetailsOpen, setArtDetailsOpen] = useState(false)

  const [selectedArtItem, setSelectedArtItem] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { userList } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllArts());
    };
    getData();
  }, [dispatch]);


  
  const ArtDetailsScreen = (item) => {
    setArtDetailsOpen(!ArtDetailsOpen)
    setSelectedArtItem(item);
  
  }
  // Logic to calculate current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList?.arts?.data?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Logic to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(userList?.arts?.data?.length / itemsPerPage);

  const filteredItems = currentItems?.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid ps-4 mb-3">
        <div className="row">
       
          <div className="row">
            <h3
              className=""
              style={{
                fontWeight: "400",
                letterSpacing: "0.9",
                color: "#709AA4",
              }}
            >
              Painting Gallery
            </h3>
          </div>

          <div className="row">
            {filteredItems?.length > 0 ? (
              filteredItems?.map((item, i) => {
                const imagesData = `${baseURL}/files/${item.image}`
                const descriptionWords = item.description.split(' ');
                const Description = descriptionWords.slice(0,2).join(' ');
                return (
                  <div className="col-md-3 col-sm-6 pe-0 m-0 rana pt-3" style={{borderRadius:'15px'}} key={i}>
                  <div className="card shadow rounded-3" style={{background:'#f7eeee4a'}}>
                  
                   <img className='rounded-top' src={imagesData} alt="Not Data" style={{height:'255px'}} />
                  
                  <div className="d-flex align-items-center card-body" style={{padding:"0.5rem", alignItems:"center"}}>
                    <div className="col-md-7 col-sm-6">
                    <div className="row ">
                              <h6 style={{fontWeight:'400',color:"#000000", fontSize:"14px", lineHeight:"16.94px"}}>
                                  {item.title}
                              </h6>
                          </div>
                          <div className="row">
                              <h6 style={{fontWeight:'400',color:"#709AA4", fontSize:"14px", lineHeight:"16.94px"}}>
                                  {Description}
                              </h6>
                          </div> 
                         
                        
                           </div>
                    <div className="col-md-5 col-sm-6 text-end pe-2" onClick={()=>ArtDetailsScreen(item)}>
                      <p style={{display: 'inline-block', borderBottom:'2px solid #709AA4',fontWeight:'400',color:"#709AA4", fontSize:"14px", lineHeight:"16.94px"}}>View Details</p>
                    </div></div>
                    
                  </div>

                  {
  ArtDetailsOpen && selectedArtItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <GalleryDetails
          closeWindow={() => setArtDetailsOpen(false)}
          title={selectedArtItem.title}
          description={selectedArtItem.description}
          image={`${baseURL}/files/${selectedArtItem.image}`}
        />
      </div>
    </div>
  )
}
                            
                          </div>
                );
              })
            ) : (
              <div
                className="fs-2 ps-5 pt-5 ms-5"
                style={{ color: "rgb(112, 154, 164)" }}
              >
                {" "}
                No Data Found
              </div>
            )}
          </div>

          <div className="row justify-content-center mt-5">
            <div className="col-md-auto">
              <Pagination className="">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="p-2 " />
                </Pagination.Prev>

                {Array.from({ length: totalPages }, (_, index) => (
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
                  disabled={currentPage === totalPages}
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

export default Gallery;
