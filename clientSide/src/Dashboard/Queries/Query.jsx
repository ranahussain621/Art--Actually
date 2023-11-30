import React,{useState,useEffect} from 'react'
import deleteicon from "../../assets/icons/delete.png"
import fileView from "../../assets/icons/file-view.png"
import { Container } from 'react-bootstrap/esm';
import Modal from './Modal';
import {useDispatch,useSelector} from 'react-redux'
import { getAllQueries } from '../../redux/features/auth/authSlice';
import DeleteQueries from './DeleteQueries';
import {Grid, Typography, styled
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '../../Components/Pagination/TablePagination';
const Query = () => {

     const queryList = useSelector((state)=>state.auth)
   const [queryId, setqueryId] = useState()
   const [DeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [paginatedData, setpaginatedData] = useState()
 const [open,setOpen] = useState(false)
     const dispatch = useDispatch()

     useEffect(()=>{
      const getQueries = async() =>{
        await dispatch(getAllQueries())
      }
      getQueries()
     },[dispatch])

   

    const openNote = () =>{
      setOpen(!open)
    }
    

    function DeleteModalScreen() {
      setDeleteModalOpen(!DeleteModalOpen)
    }
  
    const TableText = styled(TableCell)(({ theme }) => ({
      
      color: "#000",
    }));



    const paginatedlist=(val) => {
   
     
    
    setpaginatedData(val)
    }

  return (
    <>

<Grid container sx={{alignItems:"center"}}>
    <Grid item sm={9} md={9} lg={9} className='mb-3 mx-3 my-4'>
    <Typography className="Main_Head openSans-500 fs-3" style={{color:'#709AA4'}}>Queries</Typography>
    </Grid>
   
   </Grid>

     
     
      

    <div>
    </div>
 
     <Modal id={queryId} closeModal = {openNote} ModalIsOpen={open} />


      <TableContainer  className="rounded-5  shadow">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className=" openSans-700">Sr.No </TableText>
                <TableText className=" openSans-700">Name</TableText>
                <TableText className=" openSans-700">Email</TableText>
                <TableText className=" openSans-700">Action</TableText>

              </TableRow>
            </TableHead>
            <TableBody>
              {  
         paginatedData?.length>0?  
         paginatedData?.map((t, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableText component="th" scope="row" className='openSans-300'>
                  {i+1}
                  </TableText>
                  <TableText className='openSans-300' style={{textTransform:"capitalize"}}> 
                  {t.name}
                  </TableText>
                  <TableText className='openSans-300'>{t.email}</TableText>
                  <TableText >   <img src={deleteicon}
               
               onClick={()=>{
                DeleteModalScreen()
                setqueryId(t._id)
              }}
               alt='No Data' />
               
               <img src={fileView} className='ps-3'  onClick={()=>{
                setqueryId(t._id)
                openNote()}}
                alt='No Data' /></TableText>
   

         
                


                 
                </TableRow>
              ))
              :
              <h2 className="text-muted p-5 openSans-700">
                No Data
              </h2>
            }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination list={queryList?.queryList?.data} paginatedList={paginatedlist}/>
      
      <DeleteQueries ID ={queryId}
       closeModal={DeleteModalScreen}
       ModalIsOpen={DeleteModalOpen}
      />
    
      </>
   
  )
}

export default Query