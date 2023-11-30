
import React,{useEffect, useState} from 'react'


import Avatar from 'react-avatar';

import { useDispatch } from 'react-redux'
import { paymentDetail } from '../../../redux/features/auth/PaymentSlice'
import { baseURL } from '../../../redux/axios/axios'
export default function SingleArtistDonations({recordId}) {


  const [DetailShow, setDetailShow] = useState()
  const dispatch = useDispatch();

        useEffect(()=>{
          const getDetail = async()=>{
            const val = await dispatch(paymentDetail({id:recordId}))
            const data = val.payload;
            setDetailShow(data?.data[0])
          }
          getDetail()
        },[recordId])

    
  


  return (
    <>

   
   
        <div className="card shadow border-0">
    <div className="table-responsive">

         <table class="table">
        <thead>
            <tr style={{backgroundColor:'#cee2e6'}}>
            <th className=" text-center fs-4 openSans-600" scope="col ">Sr.No</th>
                <th scope="col" className=" fs-4 openSans-600">Doner Name</th>
                <th scope="col" className=" fs-4 openSans-600">Art Name </th>
                <th scope="col" className=" fs-4 openSans-600">Donation </th>
                {/* <th scope="col" className=" fs-4 openSans-600">Sender Account </th> */}
                <th scope="col" className=" fs-4 openSans-600">Date </th>
                {/* <th scope="col" className=" fs-4 openSans-600 ">Action</th> */}
  
            </tr>
        </thead>
        <tbody>
          
                         <tr className='' >
              <td >
                <p className=" text-center pt-3">1</p>
              </td>
                <td >
                    <div className='d-flex pt-3 align-items-center'>
                        <div className="">
                        {DetailShow?.sender_image ?
                           <img className='img-circle  rounded-circle' src={DetailShow?.sender_image[0]} alt="" style={{width:'50px',height:'50px'}}/>
                           :
                           <Avatar 
                           color={Avatar.getRandomColor('sitebase', ['red','blue','green'])} 
                           name={DetailShow?.sender_name}  
                           size={50}  
                           round={true}/>
                        }
                         
                          </div>
                        <div className="d-flex align-items-center px-2 " >  <p style={{textTransform:"capitalize"}} className='openSans-500 fw-semibold m-0'>{DetailShow?.sender_name}</p></div>
                    </div>
                  </td> 

                  <td>
                <div className='d-flex pt-3 align-items-center'>
                        <div className=""><img className='img-circle  rounded-circle' src={DetailShow?.art_file[0]} lt="no img"  style={{width:'50px',height:'50px'}}/></div>
                        <div className="d-flex align-items-center px-2 " >  <p style={{textTransform:"capitalize"}} className='openSans-500 fw-semibold m-0'>{DetailShow?.art_name}</p></div>
                    </div>
                   </td>


                <td >
                <div className=" text-center pt-3" > 
                 <p className='openSans-500 m-0 d-flex mt-2'>
                   $ {DetailShow?.amount}
                    </p>
                
                    </div>
                   </td>

                   {/* <td >
              
                   </td> */}
                   <td >
                <div className=" text-center pt-3" > 
                 <p className='openSans-500 m-0 d-flex mt-2'>
                  {DetailShow?.date}
                    </p>
                
                    </div>
                   </td>


                  
            </tr>
                        
           
        </tbody>
    </table>
    </div>
   
</div>
    </>

   
  )
}
