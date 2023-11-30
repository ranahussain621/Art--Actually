import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SubscribedList } from '../../../redux/features/auth/authSlice';
import TablePagination from '../../../Components/Pagination/TablePagination';
import SubscriberDetail from './SubscriberDetail';





const SubscribedMember = () => {


   const UserSubscribed = useSelector((state)=>state.auth.SubscribeList)
  const dispatch = useDispatch()
  const [paginatedData, setpaginatedData] = useState()
  const [editModal, seteditModal] = useState()
  const [docId, setdocId] = useState({
    id:'',
    email:''
  })



  useEffect(()=>{
    const getData =async () =>{
     await dispatch(SubscribedList())
    
    }
    getData()
  },[dispatch])

  const paginatedlist = (list)=>{
    setpaginatedData(list)
  
  }

  function editModalScreen(item) {
    setdocId(prev=>({
      ...prev,
      id:item?.id,
      email:item?.email
    }))
    seteditModal(!editModal)
    }

  return (
    <>
  <p style={{fontSize:"16px", fontWeight:"300", color:"rgb(120, 116, 134)"}}>The Billing information of Subscribed Members</p>
  <table class="table text-center " style={{backgroundColor:"white", border:"1px solid #B0A7A7"}}>
        <thead className=''>
          <tr className="border-bottom" style={{color:'rgb(120, 116, 134)'}}>
            <th scope="col border-end" style={{fontSize:"14px", fontWeight:"600", }}> Name</th>
            <th scope="col border-end" style={{fontSize:"14px", fontWeight:"600", }}>Email</th>
            <th scope="col" style={{fontSize:"14px", fontWeight:"600", }}>Total Amount</th>
            <th scope="col"style={{fontSize:"14px", fontWeight:"600", }}>Start Date</th>
         
            <th scope="col" style={{fontSize:"14px", fontWeight:"600", }}>Detail</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item,i) => {
          
          const timestamp = Number(item.created); // Your timestamp here
          const milliseconds = timestamp * 1000;

          // Create a new Date object using the milliseconds
          const date = new Date(milliseconds);
        
          // Get the components of the date
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
          const day = String(date.getDate()).padStart(2, '0');
 
        
          // Create a readable date string
          // const readableDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
const formattedDate = `${day}-${month}-${year}`;


            return (
              <tr className='text-muted' key={i}>
                <td  className='border-end'>{item.name}</td>
                <td className='border-end'>{item.email}</td>
                <td className='border-end'>$ 20</td>
                <td className='border-end'>{formattedDate}</td>
                <td className='border-end'><a href="#" onClick={()=>editModalScreen(item)} >More Details</a></td>
                {/* <td>
                     
                     <Button
                       variant="contained"
                       sx={{
                         background: `${item.status==="1"?"#A6E7D8":"#FFC5C5"}`,
                         padding: "3px 20px",
                         border: `1px solid ${item.status==="1"?"#008767":"#DF0404"}`,
                         fontWeight: "600",
                         color: `${item.status==="1"?"#008767":"#DF0404"}`,
                         textTransform: "capitalize",
                         "&:hover": {
                           background: `${item.status==="1"?"#A6E7D8":"#FFC5C5"}`,
                         },
                       }}
                    //    onClick={()=>{
                 
                    //      statusManagment(t.status,t._id)
                    // }}
                     >
                     {item.status==="1"?"Active":"InActive"}
                     </Button>
                   
                 </td> */}
              
                <td>
                
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination list={UserSubscribed?.customers} paginatedList={paginatedlist} />
      <SubscriberDetail
         val={docId}
         closeModal={editModalScreen}
         ModalIsOpen={editModal}
      />


  </>
  )
}

export default SubscribedMember