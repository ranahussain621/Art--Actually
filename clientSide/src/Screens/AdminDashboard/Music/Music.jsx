import React, { useState, useEffect } from "react";
import img4 from "../../../assets/images/music4.png";
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import Songs from "./Songs";

import { useSelector, useDispatch } from "react-redux";
import { getAllSound } from "../../../redux/features/auth/authSlice";
import MusicDetails from "./MusicDetail";
import { baseURL } from "../../../redux/axios/axios";

const Music = ({ searchQuery }) => {

  const [MusicDetailsOpen, setMusicDetailsOpen] = useState(false)

  const [selectedMusicItem, setSelectedMusicItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { userList } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllSound());
    };
    getData();
  }, [dispatch]);


  const MusicDetailsScreen = (item) => {
    setMusicDetailsOpen(!MusicDetailsOpen)
    setSelectedMusicItem(item);
  
  }

 

  // Logic to calculate current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList?.sound?.data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Logic to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(userList?.sound?.data?.length / itemsPerPage);



  const filteredItems =  currentItems?.filter((item) => {
    return (
      item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery?.toLowerCase())
    ) 
  })

  return (
    <>
      <div className="container-fluid ps-4">
        <div className="row">
          <div className="row">
            <h3
              className=""
              style={{
                fontWeight: "400",
                lineHeight:"36.31px",
                color: "#709AA4",
                fontSize:"30px"
              }}
            >
              Music Gallery
            </h3>
          </div>

          <div className="row">

            {filteredItems?.length > 0
              ? filteredItems?.map((item, i) => {

                const descriptionWords = item.description.split(' ');
                const Description = descriptionWords.slice(0,2).join(' ');
                
                  return (
                    <>
                     
                      <div
                        className="col-md-3 col-sm-6 pe-0 m-0 rana pt-3"
                        style={{ borderRadius: "15px" }}
                        key={i}
                      >
                        <div
                          className="card shadow rounded-4"
                          style={{ maxWidth: "270px" }}
                        >
                          <img src={img4} alt="No Data" className="" />

                          <div className="row mt-1">
                            <audio
                              src={`${baseURL}${item.file[0]}`}
                              controls
                              play
                            />
                          </div> 

                          <div
                            className="d-flex align-items-center card-body pt-2"
                            style={{ padding: "0.5rem", alignItems:"center" }}
                          >
                           
                              
                                <div className="col p-0 m-0 ps-2">
                                
                                <h6 style={{ fontWeight: "500" ,color:'#231F20', fontSize:"20px", lineHeight:"24px"}}>
                                  {item.title}
                                </h6>
                              
                             
                                <h6 style={{ fontWeight: "500" ,color:'#709AA4', fontSize:"13px", lineHeight:"10px"}} className="">
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
                        </div>
                        {
  MusicDetailsOpen && selectedMusicItem && (
    <div className="modal-show-uploadArt">
      <div className="modal-content-uploadArt">
        <MusicDetails
          closeWindow={() => setMusicDetailsOpen(false)}
          title={selectedMusicItem.title}
          description={selectedMusicItem.description}
          // image={`http://localhost:4000/files/${selectedMusicItem.image}`}
          image={img4}
        />
      </div>
    </div>
  )
}
                      </div>
                    </>
                  );
                })
              : "No Data"}
          </div>

          {userList?.sound?.data?.length > 0 && (
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
          )}

          {/* <Songs /> */}
        </div>
      </div>
    </>
  );
};

export default Music;
