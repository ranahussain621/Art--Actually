import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React,{useState} from "react";
import ReviewImg from "../../assets/images/review.png";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import {useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../redux/axios/axios";
import { useDispatch } from "react-redux";
import { AddDonation  } from "../../redux/features/auth/PaymentSlice";


const Review = () => {

  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();


     
  const user = JSON.parse(localStorage.getItem("user"));

   const {amount,art_id,music_id} = location?.state;
  

  const [data, setData] = useState({
    user_id: user?.user[0]?._id,
    card_number: "",
    card_expiry: "",
    card_cvc: "",
    user_name: "",
    
  });

  

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e, field) => {
    let value = e.target ? e.target.value : e;

    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
 
  const submit = async (e) => {
    e.preventDefault();
  

  
// Perform form validation
let formValid = true;
const newErrors = {};


if (data.user_name === '') {
  newErrors.user_name = 'Name is required';
  formValid = false;
}



if (!formValid) {
  setErrors(newErrors);
  return; // Stop execution if form is not valid
}
  
 
   if(formValid){

   
    
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
  
   

    const id = paymentMethod.id
 
    try {
      let  Amount='' 
      Amount = amount * 100
      const response = await instance.post('/api/stripe/payment', {
        amount:Amount ,
        id,
        
      });

      
  

      if (response.data.message === 'Payment Failed') {
        toast.error('Payment Failed')
      }
     
      if (response.data.message === 'Payment successful') {
        toast.success('Payment done',{
          autoClose:1000
        })
       
        if(user && art_id){
          await dispatch(AddDonation({
           sender_id:user?.user[0]?._id,
           art_id:art_id,
           amount:amount,
       }))
        navigate('/dashboard/user-dashboard')
     }
     
     
     if(user && music_id){
       await dispatch(AddDonation({
        sender_id:user?.user[0]?._id,
        music_id:music_id,
        amount:amount,
     }))
     navigate('/dashboard/user-dashboard')
     }
     
        
      }
       
      
      setData({
        card_number: "",
        card_expiry: "",
        card_cvc: "",
        user_name: "",
        
      });
  
      // Redirect the user to the Stripe checkout page
      // window.location.href = session.url;
    } catch (error) {
      toast.error(error);
    }
   }
  };


  return (
   
   
      <Box
        sx={{
          paddingTop:'6rem',
          marginBottom:'2rem',
          background: "#EEECEB",
        }}
      >
        <Container>
       

          <Grid
            container
            alignItems="center"
            sx={{
              background: "#fff",
              borderRadius: "8px",
              border: "3px solid #9f9f9f",
              borderTop: "none",
              padding: {
                xs: "20px",
                lg: "20px 50px",
              },
              mt: "20px",
            }}
          >
            <Grid item xs={12} md={7}>
              <Box  sx={{ mt: "30px", }} >
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1A1F36",
                  }}
                >
                  Credit/Debit Card Details
                </Typography>

                <Box component="form">
                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      Name (as it appears on your card) (required)
                    </label>
                    <input type="text" 
                    className="w-100 px-3  p-2 rounded border"
                    name="cardName"
                    value={data.user_name}
                    onChange={(e) => handleChange(e, "user_name")}
                    autoComplete="none"
                    placeholder = "Name"
                    />
                   
                     {errors.user_name && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.user_name}
                </span>
              )}
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      Card number (required)
                    </label>
                 

              <CardNumberElement
             
                id="card_number"
                name="card_number"
                value={data.card_number}
                className="payment-input border rounded-2 p-2  px-3"
                onChange={(e) => handleChange(e, 'cardNo')}
                options={{ placeholder: '#' }}
              />
                   
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      Expiration date (required)
                    </label>
                  

<CardExpiryElement
                    
                    id="account_expire"
                    autoComplete="none"
                    name="card_expiry"
                    value={data.card_expiry}
                    className="payment-input py-2 px-3 p-2 border rounded"
                    onChange={(e) => handleChange(e, 'cardDate')}
                    options={{ placeholder: 'MM/YYYY' }}
                   
                   />

                {/* {errors.card_expiry && (
                    <span
                      className="error text-danger mt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors.card_expiry}
                    </span>
                  )} */}
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <label className="fw-semibold mb-2">
                      Security code (required)
                    </label>
                    {/* <input type="text" className="form-control"
                    maxLength={3}
                    onChange={(e) => handleChange(e, "card_cvc")}
                    placeholder ="CVC" 
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 3);
                    }}
                    value={data.card_cvc}
                    /> */}

<CardCvcElement
                    id="account_CVC"
                    name="card_cvc"
                    value={data.card_cvc}
                    className="payment-input py-2 px-3 p-2 border rounded"
                    onChange={(e) => handleChange(e, 'cardCVC')}
                    options={{ placeholder: 'CVC' }}
                  />
                     {/* {errors.card_cvc && (
                    <span
                      className="error text-danger mt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors.card_cvc}
                    </span>
                  )} */}
                  </Box>
                  <Box
                    sx={{
                      mt: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#1A1F36",
                        fontSize: "28px",
                        fontWeight: "500",
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1A1F36",
                        fontSize: "28px",
                        fontWeight: "500",
                      }}
                    >
                      {amount ?  '$' + amount : 'No Art Added'}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: "20px",
                    }}
                  >
                    <Button
                      variant="contained"
                     type="button"
                      fullWidth
                      onClick={submit}
                      sx={{
                        color: "#fff",
                        background: "#709AA4",
                        borderRadius: "8px",
                        textTransform: "capitalize",
                        "&:hover": {
                          background: "#709AA4",
                        },
                      }}
                    >
                      Donate Now
                    </Button> 
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item  xs={12} md={5} sx={{ paddingLeft: { xs: "0px",lg: "80px",  }, }}   >
              <Box
               
              >
                <img className="img-fluid" src={ReviewImg} alt="" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
  

  );
};

export default Review;
