import React, { useEffect, useState } from 'react';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import '../../../Styles/addpayment.css';
import { instance } from '../../../redux/axios/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UpdateUser, getUserDetails } from '../../../redux/features/auth/authSlice';



const 
UserPaymentForm = () => {


  const [data, setData] = useState({
    cardNo: '',
    cardDate: '',
    cardCVC: '',
    cardName: '',
  });

  const user =JSON.parse(localStorage.getItem('user'))
  
  const userID = user?.user[0]?._id


  const [errors, setErrors] = useState({});

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (e, field) => {
    let value = e.target ? e.target.value : e;
    
    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear the error when changing the value
  };

  const dispatch = useDispatch()

  useEffect(()=>{
    const getData = async() => {
     let res = await dispatch(getUserDetails({
         id:userID
      }) )
      let val = res.payload.user 
      user.user[0] = val;
      localStorage.setItem('user', JSON.stringify(user));
    }
    getData()
  },[userID,dispatch,user])
 

  const submit = async (e) => {
    e.preventDefault();
  
// Perform form validation
let formValid = true;
const newErrors = {};

if (data.cardNo === '') {
  newErrors.cardNo = 'Card number is required';
  formValid = false;
}

if (data.cardDate === '') {
  newErrors.cardDate = 'Card expiration date is required';
  formValid = false;
}

if (data.cardCVC === '') {
  newErrors.cardCVC = 'CVC is required';
  formValid = false;
}

if (data.cardName === '') {
  newErrors.cardName = 'Name is required';
  formValid = false;
}



if (!formValid) {
  setErrors(newErrors);
  return; // Stop execution if form is not valid
}
  
 
   
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement,CardExpiryElement,CardCvcElement),
     
    });
  
    if (error) {
      toast.error(error,{
        autoClose:1000
      });
      return;
    }
  
    const formData = new FormData()
           formData.append('id',userID)
           formData.append('vip',true)
           formData.append('payment',true)
    const id = paymentMethod.id
  
    try {
      const response = await instance.post('/api/stripe/payment', {
        amount: 2000,
        id,
        // userInfo:data
      });
  

      if (response.data.message === 'Payment Failed') {
        toast.error('Payment Failed')
      }
     
      if (response.data.message === 'Payment successful') {
        toast.success('Payment Successfully Done',{
          autoClose:1000
        })
  
            await dispatch(UpdateUser(formData))
                  
            
             navigate('/dashboard/user-dashboard')
         
        
      } 
       

    setData({
      cardNo: '',
      cardDate: '',
      cardCVC: '',
      cardName: '',
     
    })
      
      
  
      // Redirect the user to the Stripe checkout page
      // window.location.href = session.url;
    } catch (error) {
      toast.error(error)
  };


 
}
  
  
  
  

  return (
    <form onSubmit={submit}>
     
  
      <div className="paycard">
       <div className="paycard-card">
        <div className="paycard-head">
            <img src="https://i.ibb.co/tQzgwvT/Featured-icon.png" alt="" />
            <h1>Add Credit Card Info</h1>
            <p>Enter your card details to enjoy more features.</p>
        </div>
        <div className="paycard-input">
       
       <div className="row1-input">
        <div className="col1-input">
        <label for="card-number">Name on Card</label>
        <input
                id="account_confirm_password"
                type="text"
                placeholder='Name'
                className="payment-input"
                name="cardName"
                style={{padding:'13px'}}
                value={data.cardName}
                onChange={(e) => handleChange(e, 'cardName')}
                autoComplete="none"
              />
        {errors.cardName && <span className="error text-danger mt-1" style={{ fontSize: '14px' }}>{errors.cardName}</span>}

        </div>
        <div className="col1-input col-2">
        <label for="card-number">Expiry</label>
        <CardExpiryElement
                    
                    id="account_expire"
                    autoComplete="none"
                   
                    className="payment-input bg-white p-3 border rounded"
                    onChange={(e) => handleChange(e, 'cardDate')}
                    options={{ placeholder: 'MM/YYYY' }}
                   
                   />
     {errors.cardDate && <span className="error text-danger mt-1" style={{ fontSize: '14px' }}>{errors.cardDate}</span>}

        </div>
        </div>
       <div className="row1-input">
        <div className="col1-input cardnum-input">
        <label for="card-number">Card Number</label>
        <CardNumberElement
                id="account_email"
                className="payment-input bg-white p-3 border rounded"
                onChange={(e) => handleChange(e, 'cardNo')}
                options={{ placeholder: '#' }}
              />
      {errors.cardNo && <span className="error text-danger mt-1 ps-1" style={{ fontSize: '14px' }}>{errors.cardNo}</span>}

        {/* <img className='mastercard' src="https://i.ibb.co/qNr5b4b/Payment-method-icon.png" alt="" /> */}
        </div>
        <div className="col1-input col-2">
        <label for="card-number">CVV</label>
        <CardCvcElement
                    id="account_CVC"
                    className="payment-input bg-white border rounded p-3"
                    onChange={(e) => handleChange(e, 'cardCVC')}
                    options={{ placeholder: 'cvc' }}
                  />
     {errors.cardCVC && <span className="error text-danger mt-1 ps-1" style={{ fontSize: '14px' }}>{errors.cardCVC}</span>}

        </div>
        </div>
     
<div className="buttons">
     <button className="btn" type='button'>Cancel</button>
     <button className="save" type='submit'>Save</button>
     </div>

        </div>
       </div>
    </div>
    </form>
  );
};

export default UserPaymentForm;
