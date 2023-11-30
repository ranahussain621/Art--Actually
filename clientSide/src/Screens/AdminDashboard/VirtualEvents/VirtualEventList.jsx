import React, { useState, useEffect } from "react";
import deleteicon from "../../../assets/icons/delete.png";
import editicon from "../../../assets/icons/edit.svg";

import { Container } from "react-bootstrap/esm";

import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import AddVirtualEvent from "./AddVirtualEvent";
import { GetAllEvents } from "../../../redux/features/EventSlice";
import TablePagination from "../../../Components/Pagination/TablePagination";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const VirtualEventList = () => {
  const {Events,isLoading} = useSelector((state)=>state.event)


  const [updateBlog, setupdateBlog] = useState();
  const [paginatedData, setpaginatedData] = useState()
  const [deleteModal, setdeleteModal] = useState()
  const [editModal, seteditModal] = useState()
  const [docId, setdocId] = useState()

  // const [paginatedData, setpaginatedData] = useState()

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
    await dispatch(GetAllEvents());
    
    };
    getData();
  }, []);



  function updateBlogModalScreen() {
    setupdateBlog(!updateBlog);
  }

  function deleteModalScreen(id) {
    setdocId(id)
    setdeleteModal(!deleteModal)
    }

    function editModalScreen(id) {
      setdocId(id)
      seteditModal(!editModal)
      }
  const TableText = styled(TableCell)(({ theme }) => ({
    color: "#000",
  }));

  const paginatedlist=(val) => {

  setpaginatedData(val)
  }

  return (
    <>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item sm={9} md={9} lg={9} className="mb-3 mx-3 my-4">
          <Typography
            className="Main_Head openSans-500 fs-3"
            style={{ color: "#709AA4" }}
          >
            Virtual Events
          </Typography>
        </Grid>
        <Grid item sm={2} md={2} lg={2} className="text-end">
          <button
            className="btn btn-sm px-4"
            style={{ background: "#709AA4", color: "white" }}
            onClick={updateBlogModalScreen}
          >
            Add Events
          </button>
        </Grid>
      </Grid>

      <TableContainer className="rounded-5  shadow">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableText className="text-muted openSans-500">Sr.No </TableText>
              <TableText className="text-muted openSans-500">Event Name</TableText>

            

              <TableText className="text-muted openSans-500">Event Location</TableText>

              <TableText className="text-muted openSans-500">Start Date</TableText>
              <TableText className="text-muted openSans-500">End Date</TableText>
              <TableText className="text-muted openSans-500">Status</TableText>
              <TableText className="text-muted openSans-500">URL</TableText>
              <TableText className="text-muted openSans-500">Action</TableText>

            </TableRow>
          </TableHead>
          <TableBody>
            { 
            isLoading?  <h5 className="text-muted p-5">
            Loading...
          </h5> :
     paginatedData?.length>0?  
     paginatedData?.map((item, i) => {

              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableText component="th" scope="row" className="openSans-300">
                    {i+1}
                  </TableText>
                  <TableText
                    className="openSans-300"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item?.name}
                  </TableText>
               

                  <TableText className="openSans-300">
                  
                     {item?.location?.split(' ').slice(0, 8).join(' ')}
            {item?.location?.split(' ').length > 8 ? '...' : ''}
                     </TableText>

                  <TableText style={{ textTransform: "capitalize" }}>
                    {item.startDate}
                  </TableText>
                  <TableText style={{ textTransform: "capitalize" }}>
                    {item.endDate}
                  </TableText>

                  <TableText style={{ textTransform: "capitalize" }}>
                    {item.status}
                  </TableText>

                  <TableText >
                 <a href=""  className="openSans-300 " style={{color:'blue',textDecoration:'none'}}>
                   {item?.url?.split(' ').slice(0, 6).join(' ')}
            {item?.url?.split(' ').length > 6 ? '...' : ''}
                 </a>
                   
                  </TableText>

                  <TableText>
                    {" "}
                    <div className="d-flex mx-1">
                      <img src={deleteicon} onClick={()=>deleteModalScreen(item._id)} alt="No Data" />
                      <div className="mx-2 px-3 border-start border-dark">
                        <img src={editicon} onClick={()=>editModalScreen(item._id)}  alt="" srcset="" />
                      </div>
                    </div>
                  </TableText>
                </TableRow>
              );
            })
            :
            <h5 className="text-muted p-5">
              No Data
            </h5>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination list={Events?.getAllEvents?.data} paginatedList={paginatedlist}/>

      <AddVirtualEvent
        closeModal={updateBlogModalScreen}
        ModalIsOpen={updateBlog}
      />
      <DeleteEvent
      ID={docId}
        closeModal={deleteModalScreen}
        ModalIsOpen={deleteModal}
      />
      <EditEvent
         ID={docId}
         closeModal={editModalScreen}
         ModalIsOpen={editModal}
      />
    </>
  );
};

export default VirtualEventList;
