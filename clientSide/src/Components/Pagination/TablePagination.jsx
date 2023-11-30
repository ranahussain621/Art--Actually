import { Box,  Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from 'react-bootstrap';

const TablePagination = ({list,paginatedList}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list?.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
  
    // Logic to handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Calculate the total number of pages
    const totalPages = Math.ceil(list?.length / itemsPerPage);

    useEffect(()=>{
        paginatedList(currentItems)
    },[currentPage,totalPages,list])
 
  return (
   <>
      <Box sx={{
          display:"flex", 
          alignItems:"center", 
          justifyContent:"space-between",
          mt:"30px"
        }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#B5B7C0",
            }}
          >
           {` Showing data ${currentPage} to ${itemsPerPage} of ${list?.length} entries`}
          </Typography>

          <Stack spacing={2}>
            {/* <Pagination  /> */}
      
            <Pagination  className='rounded-3'>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="p-2 " />
                </Pagination.Prev>

                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    className="ps-3 "
                    style={{zIndex:'0'}}
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
          </Stack>
        </Box>

   </>
  )
}

export default TablePagination