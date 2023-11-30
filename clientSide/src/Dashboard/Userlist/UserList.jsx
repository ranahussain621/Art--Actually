import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockUser, UnBlockUser, getAllUsers } from "../../redux/features/auth/authSlice";
import {
  Box,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteModal from "./DeleteModal";
import {toast} from "react-toastify";
import TablePagination from "../../Components/Pagination/TablePagination";


const TableText = styled(TableCell)(({ theme }) => ({

  color: "#000",
}));

const UserList = ({ searchQuery, activeTab }) => {
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [docId, setdocId] = useState()
  const [AlluserList, setAlluserList] = useState([])
  const [paginatedData, setpaginatedData] = useState()
  
    const {user} = useSelector(state=>state.auth)
  
  
      const dispatch = useDispatch()
  
  //get all user api
      useEffect(()=>{
        dispatch(getAllUsers())
   
      },[dispatch])
  
  useEffect(()=>{
if(user?.data){
  setAlluserList(user?.data)
}
  },[user?.data])
  
  //add filter 
  useEffect(()=>{
  if(searchQuery){
       const filteredItems =  user?.data?.filter((item) => {
      
      return (
        item?.firstName?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        
        ) 
    })
    setAlluserList(filteredItems)
  }else{
    setAlluserList(user?.data)
  }

  },[searchQuery])

 
//Block user 
const statusManagment = async(status,id)=>{ 

  if (status === "1"){
   
     dispatch(BlockUser({id:id})).then(()=>{
      dispatch(getAllUsers())
      toast.success("User blocked",{autoClose:1000})
      
    })
  }else {
     dispatch(UnBlockUser({id:id})).then(()=>{
       dispatch(getAllUsers())
       toast.success("User unblocked",{autoClose:1000})
     })
  }
}



const paginatedlist=(val) => {
  
setpaginatedData(val)
}

  function DeleteModalScreen() {
    setDeleteModalOpen(!DeleteModalOpen)
  }
  return (
    <Box>
      <Box sx={{ paddingLeft: "40px" }}>
        <Typography
          sx={{
            fontSize: "30px",
            color: "#709AA4",
          }}
        >
          All Members
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#16C098",
          }}
        >
          Active Members
        </Typography>
      </Box>
      {/* Table */}

      <Box >
        <TableContainer  className="rounded-5  shadow">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className="openSans-700">Sr.No</TableText>
                <TableText className="openSans-700">Customer Name</TableText>
                <TableText className="openSans-700">Phone Number</TableText>
                <TableText className="openSans-700">Email</TableText>
                <TableText className="openSans-700">Country</TableText>
                <TableText className="openSans-700">Status</TableText>
                <TableText className="openSans-700">Action</TableText>
              </TableRow>
            </TableHead>
            <TableBody>
             {  
         
              paginatedData?.length > 0 ?
           paginatedData?.map((t, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableText  className="openSans-300">{i+1}</TableText>
                  <TableText component="th" scope="row" className="openSans-300" style={{textTransform:"capitalize"}}>
                    {t.firstName}
                  </TableText>
                  <TableText className="openSans-300">{t.phone}</TableText>
                  <TableText className="openSans-300">{t.email}</TableText>
                  <TableText className="openSans-300" style={{textTransform:"capitalize"}}>{t.country}</TableText>
                  <TableText>
                     
                      <Button
                        variant="contained"
                        sx={{
                          background: `${t.status==="1"?"#A6E7D8":"#FFC5C5"}`,
                          padding: "3px 20px",
                          border: `1px solid ${t.status==="1"?"#008767":"#DF0404"}`,
                          fontWeight: "600",
                          color: `${t.status==="1"?"#008767":"#DF0404"}`,
                          textTransform: "capitalize",
                          "&:hover": {
                            background: `${t.status==="1"?"#A6E7D8":"#FFC5C5"}`,
                          },
                        }}
                        onClick={()=>{
                  
                          statusManagment(t.status,t._id)
                     }}
                      >
                      {t.status==="1"?"Active":"InActive"}
                      </Button>
                    
                  </TableText>
                  <TableText>
                    <IconButton aria-label="delete">
                      <DeleteOutlineOutlinedIcon
                      onClick={()=>{
                        DeleteModalScreen()
                        setdocId(t._id)
                      }}
                      sx={{ color: "#FE666F" }} />
                    </IconButton>
                  </TableText>
                </TableRow>
              ))
              :
              <h2 className="text-muted p-5">
                No Data
              </h2>
            }
            </TableBody>
          </Table>
        </TableContainer>

    
      </Box>
      <TablePagination list={AlluserList} paginatedList={paginatedlist}/>
      <DeleteModal ID ={docId}
       closeModal={DeleteModalScreen}
       ModalIsOpen={DeleteModalOpen}
      />
    </Box>
  );
};

export default UserList;
