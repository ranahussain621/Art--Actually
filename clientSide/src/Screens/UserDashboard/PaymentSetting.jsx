import React,{useEffect} from 'react'
import visa from "../../assets/images/visa.png"
import mastercard from '../../assets/images/mastercard.png'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteCardInfo, getUserCardInfo } from '../../redux/features/auth/authSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import './../../App.css'





export default function PaymentSetting({ onButtonClick }) {


    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()


    const cardList = useSelector((state)=>state.auth.card)

     const [data,setData] = useState([])



     useEffect(()=>{
   
      dispatch(getUserCardInfo({user_id :user?.user[0]?._id }))
    
     },[])


     useEffect(()=>{
        if(cardList){
            setData(cardList?.data)
        }
     },[cardList])


     const DeleteItem = async (item) =>{
        dispatch(DeleteCardInfo({id:item}))
        .then(()=>{
            toast('Card Deleted Successfully',{
                autoClose:1000
            })
            dispatch(getUserCardInfo({user_id :user?.user[0]?._id }))
        })
      }

     const getCardType = (cardNumber) => {
        const cardNumberDigits = cardNumber?.replace(/\D/g, ''); // Remove non-digit characters
        if (/^4/.test(cardNumberDigits)) {
          return 'Visa';
        } else if (/^5[1-5]/.test(cardNumberDigits)) {
          return 'MasterCard';
        }
        else if (cardNumberDigits?.startsWith("6")) {
            return 'Alipay'; // Assuming Alipay starts with '6', you can adjust this based on actual data
          }
        // Add more cases for other card types if needed
        return 'Unknown'; 
      };

      const getCardAvatar = (cardNumber) => {
        const cardType = getCardType(cardNumber);
        if (cardType === 'Visa') {
          return visa; 
        } else if (cardType === 'MasterCard') {
          return mastercard; 
        }
      
      };


     



  return (

  <>
  <div className="row">  
  <div className="col-md-1"></div>
  
    <div className="col-md-8">
   
        <div className="row ">
           
           
               
                   {
                    data?.map((item,i)=>{
                        return ( 
                             <div className="col-md-6">
                               
                        <div className="card mb-3 rounded-lg shadow" >
                            <div className="card-body" key={i}>
                            <div className="row" style={{minHeight:"150px"}}>
                               <div className="col">
                                    <img className='img-fluid' src={visa} alt="" />
                                   <img className="img-fluid" src={getCardAvatar(item.card_type)} alt="" /> 
                                    </div>  
                                <div className="col">
                                    <h4> .... {item.card_number?.slice(-4)}</h4>
                                    <p className='text-muted'>Expire {item.card_expiry}</p>
                                    </div>
                            </div>
                            <div className='border-top text-end'>
                                <button className='btn border-0 text-muted'
                                onClick={()=>DeleteItem(item._id)}
                                >Remove</button>
                            </div>
                        </div>
                        </div>
                        </div>
                        
                        )
                    })
                   }
               
           
            {/* <div className="col-md-6">
            <div className="card">
                    <div className="card-body">
                        <div className="row" style={{minHeight:"150px"}}>
                            <div className="col">
                            <img className='img-fluid' src={AlipayHk} alt="" />
                                </div>
                            <div className="col">
                                <h4>Visa ... 1154</h4>
                                <p className='text-muted'>Expire 12/27</p>
                                </div>
                        </div>
                        <div className='border-top text-end'>
                            <button className='btn border-0 text-muted'>Remove</button>
                        </div>
                    </div>
                </div>

            </div> */}
            <div className="col-md-12 my-4">
                <div type='button' onClick={onButtonClick} className='d-flex justify-content-center align-items-center' style={{
                   
                    minHeight:'170px',
                    border:'#89878754 dashed 2px'
                    }}>
                        <div className=''>
                            
<p className='text-muted'>+ add payment method</p>
                        </div>

                </div>
            </div>
        </div>
    </div>
  </div>
  </>
  )
}
