import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@mui/material';
import withdrawal from '../../../assets/images/payments/withdrawal.png';
import total from '../../../assets/images/payments/total.png'
import currentSavings from '../../../assets/images/payments/currentSavings.png'
import DonationListForAdmin from './DonationListForAdmin';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPayments } from '../../../redux/features/auth/PaymentSlice';
import './donation.css'


const DonationScreenForAdmin = () => {  
  const [ArtistList, setArtistList] = useState(); 
  const [ArtistId, setArtistId] = useState('')
  const [paymentgeneralValues, setpaymentgeneralValues] = useState({
    balance: '',
pending: '',
total: ''
  })
 
  const dispatch = useDispatch()
  const updateDetailData = useSelector((state)=>state.payment?.paymentManagement?.AllPayments)
 
  


  const handleChange = (event) => {
    setArtistId(event.target.value);
  };
  
  useEffect(()=>{
        
    dispatch( getAllPayments())

},[])


useEffect(()=>{

if(updateDetailData?.data?.Artists || updateDetailData?.data?.Values){
setArtistList(updateDetailData?.data?.Artists)

setpaymentgeneralValues((prev)=>({
    ...prev,
    balance: updateDetailData?.data?.values?.balance,
    pending: updateDetailData?.data?.values?.pending,
    total: updateDetailData?.data?.values?.total  

}))

}


},[updateDetailData?.data])
  return (
    <>


<Grid container sx={{alignItems:"center"}}>
    <Grid item sm={9} md={9} lg={9} className='mb-3 mx-3'>
    <Typography className="Main_Head openSans-500  fs-3" style={{color:'#709AA4'}}>Payment Managment</Typography>
    </Grid>
   
   </Grid>

{/* cards */}
   <Grid container spacing={3} className='my-5'  justifyContent="center">
    <Grid item md={3}>
       
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
                <div className='ms-4 border border-start'>
                    <p className=' border-bottom border-danger openSans-400 text-center border-3 fw-semibold fs-4'>Total Donations</p>
<div className='w-100 justify-content-center align-item-center'>

        <p className='fw-semibold fs-4'>$ {paymentgeneralValues.total? paymentgeneralValues.total.toFixed(2):'0'}</p>
    
</div>
                </div>
            </div>

        </div>
    </Grid>
    <Grid item md={3}>
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
                <div className='ms-4 border border-start'>
                    <p className=' border-bottom border-success openSans-400 text-center border-3 fw-semibold fs-4'>Art Actually</p>
<div className='w-100 justify-content-center align-item-center'>
       <p className='fw-semibold fs-4'>$ {paymentgeneralValues.balance? paymentgeneralValues.balance.toFixed(2):'0'}</p>
   
</div>
                </div>
            </div>

        </div>
    </Grid>
    <Grid item md={3}>
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
                    <img src={withdrawal} alt="" style={{width:'80px'}} />
                </div>
                <div className=' border border-start'>
                    <p className=' border-bottom border-primary openSans-400 text-center border-3 fw-semibold fs-4'>Withdraw Request</p>
<div className='w-100 justify-content-center align-item-center'>

        <p className='fw-semibold fs-4'>$ {paymentgeneralValues.pending ? paymentgeneralValues.pending.toFixed(2):'0.00'}</p>
  
</div>
                </div>
            </div>

        </div>
    </Grid>
   </Grid>

<div className='row my-3'>
  <div className="col-1 me-3"></div>
  <div className="col-4 ms-5">
     <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Artist List</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ArtistId}
          label="Select Artist"
          onChange={handleChange}
        >
            {ArtistList?.map((item,i)=>{
                return(
                
                  <MenuItem style={{textTransform:"capitalize"}} value={item._id} key={i}>{item.name}</MenuItem>
                
                )
            })}
        
          
        </Select>
      </FormControl>
  </div>
    
</div>

    <div className='w-100'>
   
       <DonationListForAdmin artistId={ArtistId}/>
      
        </div>
 
   
    </>
  )
}

export default DonationScreenForAdmin

