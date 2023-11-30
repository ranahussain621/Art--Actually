


import React,{useState} from 'react'
import {
styled
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";



import ArtistDonationDetail from './ArtistDonationDetail'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPayments } from '../../../redux/features/auth/PaymentSlice'
import Avatar from 'react-avatar';
import TablePagination from '../../../Components/Pagination/TablePagination'


export default function DonationListForAdmin({artistId}) {


    const [detailData, setdetailData] = useState()
    const [paymentDetailModalOpen, setpaymentDetailModalOpen] = useState(false)
    const [recordId, setrecordId] = useState()
    const [paginatedData, setpaginatedData] = useState()
    const dispatch = useDispatch()
    const updateDetailData = useSelector((state)=>state.payment?.paymentManagement?.AllPayments)

    


    useEffect(()=>{
        
             dispatch( getAllPayments({artist_id:artistId}))
       
    },[artistId])


    useEffect(()=>{
        
       if(updateDetailData){
        setdetailData(updateDetailData?.data?.payments)
       }
  
},[updateDetailData])
    
    function paymentDetailModalScreen() {
        setpaymentDetailModalOpen(!paymentDetailModalOpen)
      }


      const TableText = styled(TableCell)(({ theme }) => ({
      
        color: "#000",
      }));

const paginatedlist=(val) => {

 

setpaginatedData(val)
}

  return (
    <>

   
   

       
<TableContainer  className="rounded-5  shadow">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableText className=" openSans-700">Sr.No </TableText>
                <TableText className=" openSans-700">Donor Name</TableText>
                <TableText className=" openSans-700">Art Name</TableText>
                <TableText className=" openSans-700">Donation</TableText>
                <TableText className=" openSans-700">Art actually Fees</TableText>
                <TableText className=" openSans-700">View Detail</TableText>

               

              </TableRow>
            </TableHead>
            <TableBody>
              {  
          detailData?.length>0?  
          paginatedData?.map((item, i) => 
      {
        return (    <TableRow
          key={i}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableText component="th" scope="row" className='openSans-400'>
          {i+1}
          </TableText>
          <TableText> 
          <div className='d-flex '>
                <div className="">
                {item?.sender_image ?
                   <img className='img-circle rounded-circle' src={item?.sender_image[0]} alt=""  style={{width:'50px',height:'50px'}}/>
                   :
                   <Avatar 
                   color={Avatar.getRandomColor('sitebase', ['red','blue','green'])} 
                   name={item?.sender_name}  
                   size={50}  
                   round={true}/>
                }
                 
                  </div>
                <div className="d-flex align-items-center px-2 " >  <p style={{textTransform:"capitalize"}} className='openSans-400 m-0'>{item.sender_name}</p></div>
            </div>
            </TableText>
          <TableText className=''>
          <div className='d-flex '>

                
                 <div><img className='img-circle   rounded-circle' src={item.art_file[0]} alt=""  style={{width:'50px',height:'50px'}}/></div>  
                   
                <div className="d-flex align-items-center px-2 " >  <p style={{textTransform:"capitalize"}} className='openSans-400 m-0'>{item.art_name}</p></div>
            </div>
             </TableText>
          <TableText className='openSans-400'>  $ {item.amount}</TableText>
          <TableText className='openSans-400 '>  $ {item.amount/10}</TableText>
          <TableText className='openSans-400'> 
          <p  className='pt-3' onClick={()=>{
paymentDetailModalScreen()
setrecordId(item._id)
} }>More Detail</p>
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



<TablePagination list={detailData} paginatedList={paginatedlist}/>
<ArtistDonationDetail recordId ={recordId}
       closeModal={paymentDetailModalScreen}
       ModalIsOpen={paymentDetailModalOpen}
      />
    </>

   
  )
}
