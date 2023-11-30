import React, { useEffect, useState } from 'react'
import DonationList from './DonationList'
import { Grid, Typography } from '@mui/material';
import withdrawal from '../../../assets/images/payments/withdrawal.png';
import total from '../../../assets/images/payments/total.png'
import currentSavings from '../../../assets/images/payments/currentSavings.png'
import SendPayOutRequest from './SendPayOutRequest';
import { getAllPayments } from '../../../redux/features/auth/PaymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import './donation.css'
import { AccountDetail } from '../AccountDetail';
import ArtistCancelSubscriptionRequest from '../../AdminDashboard/Profile/ArtistCancelSubscriptionRequest';

const DonationScreen = () => {

    const dispatch  = useDispatch()
    const [payoutModalOpen, setpayoutModalOpen] = useState(false)
    const [Values, setValues] = useState()
    const [price, setprice] = useState()
    const [subModal, setsubModal] = useState(false)

    

    const updateDetailData = useSelector((state)=>state.payment?.paymentManagement?.AllPayments)

    const user = JSON.parse(localStorage.getItem("user"));
    const userId =user?.user[0]?._id;


    useEffect(()=>{
        const getvalues = async()=>{
          
         dispatch( getAllPayments({artist_id:userId ,role:'artist'})) 
           
        }
    getvalues()
  
},[])


const cancelSubscripton =()=>{
    setsubModal(!subModal)
    }

useEffect(()=>{
        
    if(updateDetailData){
        setValues(updateDetailData?.data?.values)
    }

},[updateDetailData])

    function payoutModalScreen(price) {
        setprice(price)
        setpayoutModalOpen(!payoutModalOpen)
      }
  return (
    <>


<Grid container sx={{alignItems:"center"}}>
    <Grid item sm={12} md={7} lg={7} className='container'> 
    <AccountDetail /> </Grid>
  
   <Grid item sm={12} md={5} lg={5} spacing={3} className='w-100' >
   <div item className='d-flex justify-content-end text-end w-100 pe-0 me-0'>
   <button className='btn  mx-2' 
                onClick={cancelSubscripton}
                disabled={ user?.user[0]?.subscribe==='false'}
                style={{color:"#fff",background:'#709AA4'}}>Cancel Subscription</button>
        <button className='btn  me-5' style={{backgroundColor:'#709AA4', color:'white'}} onClick={()=>payoutModalScreen(Values?.balance? Values?.balance.toFixed(2):'0')} >Withdraw Request</button>
   </div>
   <div className="container d-flex justify-content-center">
    <div className="div">
    <Grid item className='mt-md-2 mt-sm-2' xs>
       
        <div className='card shadow TableWidth'
        style={{
             padding:"10px",
             alignItems:"center",
              border:'2px solid #709AA4',
              borderRadius:"8px",
              backgroundColor:"#d3e0e2"
        }}
        >
            <div className="d-flex w-100">
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={withdrawal} alt="" style={{width:'80px'}} />
                </div>
                <div className='ms-1 border border-start'>
                    <p className=' border-bottom border-danger openSans-400 text-center border-3 fw-semibold TableText'>Amount Withdrawal</p>
<div className='w-100 justify-content-center align-item-center'>
    <p className='fw-semibold fs-4'>${Values?.pending? Values?.pending.toFixed(2):'0'}</p>
</div>
                </div>
            </div>

        </div>
    </Grid>
    <Grid item className='mt-md-2 mt-sm-2 my-2' xs>
    <div className='card shadow TableWidth'
        style={{
            marginY:"2rem",
             padding:"10px",
             alignItems:"center",
              border:'2px solid #709AA4',
              borderRadius:"8px",
              backgroundColor:"#d3e0e2"
        }}
        >
            <div className="d-flex w-100">
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={currentSavings} alt="" style={{width:'80px'}} />
                </div>
                <div className='ms-1 border border-start'>
                    <p className=' border-bottom border-success openSans-400 text-center border-3 fw-semibold TableText'>Current Balance</p>
<div className='w-100 justify-content-center align-item-center'>
    <p className='fw-semibold fs-4'>${Values?.balance? Values?.balance.toFixed(2):'0'}</p>
</div>
                </div>
            </div>

        </div>
    </Grid>
    <Grid item className='mt-md-2 mt-sm-2' xs>
    <div className='card shadow TableWidth'
        style={{
            marginY:"2rem",
             padding:"10px",
             alignItems:"center",
              border:'2px solid #709AA4',
              borderRadius:"8px",
              backgroundColor:"#d3e0e2"
        }}
        >
            <div className="d-flex w-100">
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={total} alt="" style={{width:'80px'}} />
                </div>
                <div className='ms-1 border border-start'>
                    <p className=' border-bottom border-primary openSans-400 text-center border-3 fw-semibold TableText'>Total Amount</p>
<div className='w-100 justify-content-center align-item-center'>
    <p className='fw-semibold fs-4'>${Values?.total?Values?.total.toFixed(2):'0'}</p>
</div>
                </div>
            </div>

        </div>
    </Grid>
      </div>
      </div>
   </Grid>
   </Grid>

    <div className='w-100'>
   
        <DonationList/>
      
        </div>

        <ArtistCancelSubscriptionRequest
  
  closeModal={cancelSubscripton}
  ModalIsOpen={subModal}
  />

    
    <SendPayOutRequest 
    price = {price}
       closeModal={payoutModalScreen}
       ModalIsOpen={payoutModalOpen}
      />
    </>
  )
}

export default DonationScreen