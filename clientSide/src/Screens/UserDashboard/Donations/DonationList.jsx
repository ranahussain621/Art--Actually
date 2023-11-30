




import React,{useEffect, useState} from 'react'

import {styled} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from 'react-avatar';

import { useDispatch } from 'react-redux'
import { getAllPayments } from '../../../redux/features/auth/PaymentSlice'
import { baseURL } from '../../../redux/axios/axios'
import TablePagination from '../../../Components/Pagination/TablePagination';



export default function DonationList() {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId =user?.user[0]?._id;
const [paginatedData, setpaginatedData] = useState()

    
    const [DonationsList, setDonationsList] = useState( )
 


    useEffect(()=>{
        const getvalues = async()=>{
          
            //in payload we are sending role "artist" it's hardcorded value, backend developer demand for this
            const val= await dispatch( getAllPayments({artist_id:userId, role:"artist" })) 
            const data = val.payload?.data;
 
            setDonationsList(data?.payments)
        }
    getvalues()
  
},[userId,dispatch])


const paginatedlist = (list)=>{
  setpaginatedData(list)

}

    const TableText = styled(TableCell)(({ theme }) => ({
        fontSize: "14px",
        fontWeight: "600",
        color: "#000",
      }));



  return (
    <>

   
   
     


<TableContainer  className="rounded-5  shadow table-responsive">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className="text-muted">Sr.No </TableText>
                <TableText className="text-muted">Donor Name</TableText>
                <TableText className="text-muted">Art Name</TableText>
                <TableText className="text-muted">Donation</TableText>
 
                {/* <TableText className="text-muted">Action</TableText> */}

              </TableRow>
            </TableHead>
            <TableBody>
              {  
          paginatedData?.length>0?  
          paginatedData?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableText component="th" scope="row">
                  {i+1}
                  </TableText>
                
                  <TableText> <div className='d-flex'>
                        <div className="">
                          {item?.sender_image ?
                           <img className='img-circle  rounded-circle' src={item.sender_image[0]} alt="" style={{width:'50px',height:'50px'}}/>
                           :
                           <Avatar 
                           color={Avatar.getRandomColor('sitebase', ['red','blue','green'])} 
                           name={item?.sender_name}  
                           size={50}  
                           round={true}/>
                        }
                         
                          </div>
                        <div className="d-flex align-items-center px-2 " >  <p style={{textTransform:"capitalize"}} className='openSans-500 fw-semibold m-0'>{item.sender_name}</p></div>
                    </div></TableText>
                    <TableText> <div className='d-flex'>
                        <div className=""><img className='img-circle img-fluid  rounded-circle' src={item.art_file[0]} alt=""  style={{width:'50px',height:'50px'}}/></div>
                        <div className="d-flex align-items-center px-2" >  <p style={{textTransform:"capitalize"}} className='openSans-500 fw-semibold m-0'>{item.art_name}</p></div>
                    </div></TableText>

                  <TableText className=''> $ {item.amount}</TableText>
           
              
                


                 
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
        <TablePagination list={DonationsList} paginatedList={paginatedlist}/>
    </>

   
  )
}
