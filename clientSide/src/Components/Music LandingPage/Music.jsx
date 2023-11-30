import React, { useState, useEffect } from "react";
import { Table, Row, Col } from "react-bootstrap";
import Pagination from "../Pagination/Pagination";
import { useDispatch,useSelector } from "react-redux";
import { getAllSound } from "../../redux/features/auth/authSlice";
import { baseURL } from "../../redux/axios/axios";
import uploadimg from '../../assets/icons/uploadblog.png'
import TablePagination from "../Pagination/TablePagination";

const MusicLandingPage = () => {
 

  

  const Sound  = useSelector((state) => state.auth.userArt);
  const {isLoading}  = useSelector((state) => state.auth);

 
    


  const [data, setData] = useState([]);
  const pageSize = 5;
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setpaginatedData] = useState()
 

  const dispatch = useDispatch();



  useEffect(() => {
    const getData = async () => {
     const response = await dispatch( getAllSound() );
      setData(response.payload?.data);
     
    };
    getData();
  }, [dispatch]);

useEffect(()=>{
  setData(Sound?.data)
},[Sound])

 

  // useEffect(() => {  
    
  //   if (data?.length > 0) {
   
  //     setCurrentPage(1);
  //   }
  //   const totalPages = Math.ceil(data?.length / pageSize);
  //    setTotalPage(totalPages);
  // }, [data, pageSize]);

//   const paginatedData = data
//     ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
//     : [];

  // useEffect(() => {
  //   if (data?.length > 0) {
  //     const totalPages = Math.ceil(data?.length / pageSize);
  //     setTotalPage(totalPages);
  //   } else {
  //     setTotalPage(0);
  //   }
  // }, [data, totalPage]);

  // const changeCurrentPageValue = (value) => {
  //   // setFilteredData(value);
  //   setCurrentPage(value);
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPage) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  // const handlepreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };

  // Pagination
  // const indexOfLastItem = currentPage * pageSize;
  // const indexOfFirstItem = indexOfLastItem - pageSize;
  // const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);


  const paginatedlist=(val) => {
   
     
    
    setpaginatedData(val)
    }





  return (
    <div className="d-flex justify-conter-center">
    

   
       <div className="row w-100">
        <div className="col-md-12">
         {  
         
         
         isLoading ? ( <div class="d-flex justify-content-center pt-4">
         <div class="spinner-border" role="status" style={{color:'#709AA4'}}>
           <span class="sr-only">Loading...</span>
         </div>
       </div>) 
       :
        paginatedData?.length > 0 ? (

paginatedData?.map((row,i) => {
 
//   const audioRef = React.createRef();
  return (
  
        <div className="d-flex mt-4" key={i}>
               <div className="col-md-3">
            <p className="fw-bold fs-6 h5 m-0 pt-1" style={{textTransform:"capitalize"}}>{row.title}</p>
            <p
              className="text-muted pt-1"
              style={{ fontSize: "14px", fontWeight: "700",textTransform:"capitalize" }}
            >
              

              {row.description?.split(' ').slice(0, 4).join(' ')}
             {row.description?.split(' ').length > 4 ? '...' : ''}
            </p>
          </div>
          <div>
            <img src={row.image? row.image[0]:uploadimg} alt="" style={{height:"50px", width:'50px'}}/>
          </div>
          
          <div className="px-2 col-md-8">
            {  
              
              <audio 
              preload="none"
              className="w-100"
              src={row.file[0]} 
              // ref={audioRef}
              // onPlay={() => handlePlay(audioRef.current)}
              controls></audio>
            }
          </div>
       
        </div>
    

  );
})
) : (
<div className="ps-5 pt-5 fs-5 openSans-300 text-muted">No Data Found</div>
)}
         </div>
      
    

     
      {/* <Row className="justify-content-end mt-3">
        <Col md="auto">
          <Pagination
            totalPage={totalPage}
            currentPageValue={changeCurrentPageValue}
            nextPage={handleNextPage}
            previousPage={handlepreviousPage}
            currentItems={currentItems}
            data={data}
          />
        </Col>
      </Row> */}
      <TablePagination list={data} paginatedList={paginatedlist}/>
       </div>
       
         
    </div>
  );
};

export default MusicLandingPage;
