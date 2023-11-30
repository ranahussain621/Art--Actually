
import React,{useState,useEffect} from 'react'
import deleteicon from "../../../assets/icons/delete.png"
import editicon from "../../../assets/icons/edit.svg"
import {useDispatch,useSelector} from 'react-redux'

import {Grid, Typography, styled
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NewBlog from './NewBlog';
import { ListOfBlogs } from '../../../redux/features/auth/PaymentSlice';
import TablePagination from '../../../Components/Pagination/TablePagination';
import DeleteBlog from './DeleteBlog';
import UpdateBlog from './UpdateBlog';
// import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const BlogScreen = () => {

     const {blogList,isLoading} = useSelector((state)=>state.payment)
    
const [addblog, setaddblog] = useState()
const [delemodal, setdeleteModal] = useState()
const [updateBlog, setupdateBlog] = useState()
const [docId, setdocId] = useState()
const [deletedocId, setdeletedocIddocId] = useState()





    const [paginatedData, setpaginatedData] = useState()

     const dispatch = useDispatch()

     useEffect(()=>{
  dispatch(ListOfBlogs({}))
     },[])

   

    

    function blogModalScreen() {
      setaddblog(!addblog)
    }
  
    function updateBlogModalScreen(id) {
        setdocId(id)
        setupdateBlog(!updateBlog)
      }
    
    function deleteModalScreen(id) {
      setdeletedocIddocId(id)
        setdeleteModal(!delemodal)
      }
    const TableText = styled(TableCell)(({ theme }) => ({

      color: "#000"
    }));



    const paginatedlist=(val) => {
   
     
    
    setpaginatedData(val)
    }

  return (
    <>

<Grid container sx={{alignItems:"center"}}>
    <Grid item sm={9} md={9} lg={9} className='mb-3 mx-3 my-4'>
    <Typography className="Main_Head openSans-500 fs-3" style={{color:'#709AA4'}}>Blogs</Typography>
    </Grid>
   <Grid item sm={2} md={2} lg={2} className='text-end'>
    <button className='btn btn-sm px-4' style={{color:'#fff',background:'rgb(113, 157, 168)'}} onClick={blogModalScreen}>Add blog</button>
   </Grid>
   </Grid>

     
     
      

 



      <TableContainer  className="rounded-5  shadow">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className="text-muted">Sr.No </TableText>
                <TableText className="text-muted">Title</TableText>
                <TableText className="text-muted">Description</TableText>
                <TableText className="text-muted">Due Date</TableText>

                <TableText className='text-muted'>Type</TableText>
                <TableText className="text-muted">Action</TableText>

              </TableRow>
            </TableHead>
            <TableBody>
              {  isLoading?  <h5 className="text-muted p-5">
                Loading...
              </h5> :
         paginatedData?.length>0?  
         paginatedData?.map((t, i) => {


          const timestamp = Number(t.date); // Your timestamp here
const date = new Date(timestamp);

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];



const month = monthNames[date.getMonth()]; // Get the month name


const year = date.getFullYear();

const day = String(date.getDate()).padStart(2, '0');


const formattedDate = `${day}-${month}-${year} `;


          return(
              <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableText component="th" scope="row" className='openSans-300'>
                  {i+1}
                  </TableText>
                  <TableText className='openSans-300' style={{textTransform:"capitalize"}}> 
                  {t.title}
                  </TableText>
                  <TableText className='openSans-300' style={{textTransform:"capitalize"}}>
                  {t.description?.split(' ').slice(0, 8).join(' ')}
            {t.description?.split(' ').length > 8 ? '...' : ''}
                    </TableText>
                <TableText className="openSans-300">{formattedDate}</TableText>

                <TableText>
  <div className="d-flex">
    {t.categories?.map((item, i) => {
      return (
        <div className={` px-1 openSans-400${i < t.categories.length - 1 ? ' border-end border-dark' : ''}`}>
          {item}
        </div>
      );
    })}
  </div>
</TableText>

                  <TableText> <div className='d-flex mx-1'>
                   <img src={deleteicon}
            onClick={()=>deleteModalScreen(t._id)}
               alt='No Data' />
               <div className='mx-2 px-3 border-start border-dark' >   
                <img src={editicon}  alt="" srcset=""  onClick={()=>updateBlogModalScreen(t._id)}/>

               </div>
            
             
                    </div>  
            </TableText>
   

         
                


                 
                </TableRow>
          )
              
})
              :
              <h5 className="text-muted p-5">
                No Data
              </h5>
            }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination list={blogList?.data} paginatedList={paginatedlist}/>
      
    <NewBlog 
     closeModal={blogModalScreen}
     ModalIsOpen={addblog}
    />
    <DeleteBlog
    ID={deletedocId}
    closeModal={deleteModalScreen}
    ModalIsOpen={delemodal}
    />
     <UpdateBlog
    ID={docId}
    closeModal={updateBlogModalScreen}
    ModalIsOpen={updateBlog}
    />
      </>
   
  )
}

export default BlogScreen