


import React,{useState} from 'react'

import {Typography,styled,Grid
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import CompletePayoutReq from './CompletePayoutReq';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AllPayoutRequestList } from '../../../redux/features/auth/PaymentSlice';
import Avatar from 'react-avatar';
import TablePagination from '../../../Components/Pagination/TablePagination';

export default function PaymentOutRequest() {

    const [PayoutReqModalOpen, setPayoutReqModalOpen] = useState(false)
    const [completeList, setcompleteList] = useState()
    const [paginatedData, setpaginatedData] = useState();

    const [ids, setids] = useState({
      user_id:'',
      request_id:'',
      receipt:''
    })
    const dispatch = useDispatch();
    const updatedList = useSelector((state)=>state.payment?.paymentManagement?.AllPayoutList)
  
  



useEffect(()=>{
  dispatch(AllPayoutRequestList())
},[])

useEffect(()=>{
if(updatedList){
  setcompleteList(updatedList?.data)

}
},[updatedList])
    
    function PayoutReqModalScreen() {
        setPayoutReqModalOpen(!PayoutReqModalOpen)
      }

      const TableText = styled(TableCell)(({ theme }) => ({
       
        color: "#000",
      }));


//get paginated data from pagination component and set in state
      const paginatedlist=(val) => {
       
      setpaginatedData(val)
      }


  return (
    <>

<Grid container sx={{alignItems:"center"}}>
    <Grid item sm={9} md={9} lg={9} className='mb-5 mx-3'>
    <Typography className="Main_Head openSans-500  fs-3" style={{color:'#709AA4'}}>Payment Out Requests</Typography>
    </Grid>
   
   </Grid>
   
       
 <TableContainer  className="rounded-5  shadow">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className="text-muted">Sr.No </TableText>
                <TableText className="text-muted">Artist Name</TableText>
                <TableText className="text-muted">Account Number</TableText>
                <TableText className="text-muted">Bank Name</TableText>
                <TableText className="text-muted">Branch Number</TableText>
                <TableText className="text-muted">Routing Number</TableText>

                <TableText className="text-muted">Pay Out Request</TableText>
               
                <TableText className="text-muted">Status</TableText>
                <TableText className="text-muted">Date</TableText>

                <TableText className="text-muted">Action</TableText>

              </TableRow>
            </TableHead>
            <TableBody>
              {  
          completeList?.length>0?  
          paginatedData?.map((item, i) => {
            return (  <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableText component="th" scope="row">
              {i+1}
              </TableText>
              <TableText> <div className='d-flex '>
                    <div className="">
                    {item?.image ?
                       <img className='img-circle  rounded-circle' src={item?.image[0]} alt="" style={{width:'50px',height:'50px'}}/>
                       :
                       <Avatar 
                       color={Avatar.getRandomColor('sitebase', ['red','blue','green'])} 
                       name={item?.reciver_name}  
                       size={50}  
                       round={true}/>
                    }
                     
                      </div>
                    <div className="d-flex align-items-center px-2 " > 
                     <p className='openSans-400 m-0' style={{textTransform:"capitalize"}}>{item?.reciver_name}</p>
                     </div>
                </div></TableText>
              <TableText className='openSans-300'> {item.bankAccountNumber}</TableText>
              <TableText className='openSans-300'> {item.bankName}</TableText>

              <TableText className='openSans-300'> {item.branchNumber}</TableText>
              <TableText className='openSans-300'> {item.routingNumber}</TableText>


              <TableText className='openSans-300'>  ${ item.amount ? Number( item.amount).toFixed(2):'0'}</TableText>
           
              <TableText className='openSans-300'>  {item.status}</TableText>

              <TableText>{item.date}</TableText>
              <TableText>
                <button className='btn btn-sm ' style={{backgroundColor:'rgb(113, 157, 168)',color:'white'}} onClick={()=>{
                  PayoutReqModalScreen()
                  setids({user_id:item.reciver_id,request_id:item._id,receipt:item.receipt})
                  }}>Change Status</button>
                
            </TableText>
            


             
            </TableRow>)
          }
               
              )
              :
              <h2 className="text-muted p-5">
                No Data
              </h2>
            }
            </TableBody>
          </Table>
        </TableContainer>
      



        <TablePagination list={completeList} paginatedList={paginatedlist}/>

        <CompletePayoutReq
         closeModal={PayoutReqModalScreen}
         ModalIsOpen={PayoutReqModalOpen}
         user_id={ids.user_id}
         request_id={ids.request_id}
         receipt={ids.receipt}
        />
    </>

   
  )
}
