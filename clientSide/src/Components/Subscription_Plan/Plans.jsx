import React, { useEffect, useState } from 'react';
// import check from '../../assets/images/shield.png';
import checked from '../../assets/images/checked.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CreateSessionForSubscription, CreateUserForSubscription } from '../../redux/features/auth/PaymentSlice';
import { UpdateUser, getUserDetails } from '../../redux/features/auth/authSlice';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Plans = () => {

  const param = useParams();
  var {id} = param;
   
  const [userInfo,setUserInfo] = useState(null)

  const dispatch = useDispatch()

  useEffect(()=>{
    const getVal = async () =>{
         const res =  await dispatch(getUserDetails({   id:id    } ))
         const val = res.payload 
         setUserInfo(val.user,'okk');    
    }
    getVal()
  },[id,dispatch])


    const Stripe = useSelector((state)=>state.payment.paymentManagement?.Stripe)
   

   const navigate = useNavigate()

   const user = JSON.parse(localStorage.getItem("user"));
   const SubID = user?.user[0]?.sub_id;
 
   
    const userEmail = userInfo?.email
    const userName = `${userInfo?.firstName} ${userInfo?.lastName}`
  

  //update user subscription id
  const update = async(stripeCustomerId)=>{
        const formData = new FormData();
        
        formData.append("email",userEmail);
        
        formData.append("sub_id",stripeCustomerId)
      
        await dispatch(UpdateUser(formData))
      }


   


    const move = async () =>{
if(SubID){
    await dispatch(CreateSessionForSubscription({
          priceId:"price_1No1E1SJCWz1Ztfgi7Y36PPh",
          stripeCustomerId : SubID,
          userId:id
        }))
        .then((res)=>{
          if(res.payload.success===true){
    
       
   
       window.open(res.payload?.session?.url, '_blank')
          }
      
         })



      return
}else{
    await dispatch(CreateUserForSubscription({
      email:userEmail,
      name:userName
    })) 
    .then(async(data)=>{
       await dispatch(CreateSessionForSubscription({
        priceId:"price_1NxrlnLTHGubDotJq9yc9w1Q",
        stripeCustomerId : data.payload.stripeCustomerId,
        userId:id
      }))
      .then((res)=>{
       if(res.payload.success===true){
 
    update(data.payload.stripeCustomerId)

    // window.open(res.payload?.session?.url, '_blank')
    window.location.href = res.payload?.session?.url;

       }
   
      })
     return
    })
}

  
//  .then(()=>
//  {
//   const getData = async () =>{
//       if(SubID){
       
//       }
//      else if(Stripe?.stripeCustomerId && !SubID){
//         const res = await dispatch(CreateSessionForSubscription({
//            priceId:"price_1NxrlnLTHGubDotJq9yc9w1Q",
//            stripeCustomerId : Stripe.stripeCustomerId,
//            userId:id
//          }))
//          .then((res)=>{
//           if(res.payload.success===true){
    
//        update()
   
//        window.open(res.payload?.session?.url, '_blank')
//           }
      
//          })
//         return
//        }
      
//     }
//     getData()  

//  })

   

    }


    const regularMove = () =>{
      navigate('/dashboard/user-dashboard')
    }

  return (
    <div className="container my-5 bg-white card" style={{ fontFamily: "inter", borderRadius: '10px', boxShadow: '5px 5px 5px 0px gray' }}>
      <div className='card border-0 text-center ps-5 pe-5'>
        <div className="row">
        <KeyboardBackspaceIcon className=' ms-3' style={{fontSize:'4rem',cursor:'pointer', color:'#709AA4'}} onClick={regularMove} />
        
        </div>
        <div className="row d-flex align-items-center card-body flex-column flex-sm-row py-5">
          {/* <div className="col-sm-auto col-md-4 text-start mb-3">
           
          </div>  */}
         
          <div className="col-sm-6 col-md-6 col-lg-6 rounded text-center mb-3 py-5 ms-md-5" style={{ background: '#709AA4', color: 'white' ,width:'300px'}}>
            <p className=''>Regular Member</p>
            <h2 className='' style={{ fontWeight: '600' }}>$ 0</h2>
            <p className=''>Per Month</p>
            <button className='btn bg-white rounded-pill px-4 py-2 px-5 mt-5'  style={{ color: 'black' }} 
            onClick={regularMove}><small>Get Started</small></button>
          </div> 
          <div className="col-sm-6 col-md-6 col-lg-6 rounded text-center mb-3 py-5 ms-md-5" style={{ background: '#709AA4', color: 'white' ,width:'300px'}}>
            <p className=''>VIP Member</p>
            <h2 className='' style={{ fontWeight: '600' }}>$ 20</h2>
            <p className=''>Per Month</p>
            <button className='btn bg-white rounded-pill px-4 py-2 px-5 mt-5' onClick={move} style={{ color: 'black' }}><small>Choose Plan</small></button>
          </div>
        </div>
        <div className="row d-flex align-items-center p-2 " style={{ background: '#F9F2FF', borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
          <div className="col pt-3 text-start"><p className='fs-5' style={{ fontWeight: 'bold' }}>Unlimited Art Works Uploadable </p></div>
          <div className="col">
            {/* <img src={checked} alt="" /> */}
          </div>
          <div className="col">
            <img src={checked} alt="" />
          </div>
        </div>
        <div className="row d-flex align-items-center p-2 " style={{ background: 'transparent', borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
          <div className="col pt-3 text-start"><p className='fs-5' style={{ fontWeight: 'bold' }}>Donations</p></div>
          <div className="col">
            <img src={checked} alt="" />
          </div>
          <div className="col">
            <img src={checked} alt="" />
          </div>
        </div>
        {/* <div className="row d-flex align-items-center p-2 " style={{ background: '#F9F2FF', borderRadius: '20px', marginLeft: '10px', marginRight: '10px' }}>
          <div className="col pt-3 text-start"><p className='fs-5' style={{ fontWeight: 'bold' }}>Feature Title</p></div>
          <div className="col">
            <img src={checked} alt="" />
          </div>
          <div className="col">
            <img src={checked} alt="" />
          </div>
        </div> */}
       
       
      </div>
    </div>
  )
}

export default Plans;
