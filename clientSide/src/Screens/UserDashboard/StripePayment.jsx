import React, { useState } from "react";
import "../../Styles/addpayment.css";
import AtmImg from "../../assets/icons/AtmImg.png";
import "./addpayment.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UserCardInfo, getUserCardInfo } from "../../redux/features/auth/authSlice";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const StripePayment = ({onButtonClick}) => {
  const countries = [
    "Country",
    "United Kingdom",
    "Pakistan",
    "United States",
    "India",
  ];

  const user = JSON.parse(localStorage.getItem("user"));



  const [data, setData] = useState({
    user_id: user?.user[0]?._id,
    card_number: "",
    card_expiry: "",
    card_cvc: "",
    user_name: "",
    country: "",
    address1: "",
    address2: "",
    district: "",
    area: "",
    focus:""
  });


  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleCountry = (e, field) => {
    let value = e.target ? e.target.value : e;

    setData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleInputFocus = (evt) => {
    setData((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    
    setData((prev) => ({ ...prev, [name]: value }));
  }

  const validateCardNumber = (cardNumber) => {
    // Remove spaces and non-numeric characters
    const cleanedNumber = cardNumber.replace(/[^0-9]/g, '');

    if (cleanedNumber?.length !== 16) {
      return false; // Card number must have exactly 16 digits
    }
  
    for (let i = 0; i <= 12; i++) {
      const group = cleanedNumber.substring(i, i + 4);
      const rest = cleanedNumber.substring(i + 4);
  
      if (rest.includes(group)) {
        return false; // Invalid repeated group of digits
      }
    }
  
    return true;
  };

  const validateCardExpiry = (cardExpiry) => {
    const [month, year] = cardExpiry.split('/').map(part => parseInt(part));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of current year
    const currentMonth = currentDate.getMonth() + 1;
    
    if (
      month < 1 || month > 12 || year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      return false; // Invalid month, year, or already expired
    }
  
    return true;
  };


  const validateCVC = (cvc) => {
    // Remove non-numeric characters
    const cleanedCVC = cvc.replace(/[^0-9]/g, '');
  
    if (cleanedCVC?.length !== 3) {
      return false; // CVC must have exactly 3 digits
    }
  
    return true;
  };
  
 
  

  const submit = async (e) => {
    e.preventDefault();

    // Perform form validation
    let formValid = true;
    const newErrors = {};


     // Usage Card Validations
  if (!validateCardNumber(data.card_number)) {
    newErrors.card_number = "Invalid card number";
    formValid = false;
  }

  if (!validateCardExpiry(data.card_expiry)) {
    newErrors.card_expiry = "Invalid card expiry";
    formValid = false;
  }

  if (!validateCVC(data.card_cvc)) {
    newErrors.card_cvc = "Invalid CVC";
    formValid = false;
  }

    if (data.card_number === "") {
      newErrors.card_number = "Card number is required";
      formValid = false;
    }

    if (data.card_expiry === "") {
      newErrors.card_expiry = "Card expiration date is required";
      formValid = false;
    }

    if (data.card_cvc === "") {
      newErrors.card_cvc = "CVC is required";
      formValid = false;
    }

    if (data.user_name === "") {
      newErrors.user_name = "Name is required";
      formValid = false;
    }

    if (data.country === "") {
      newErrors.country = "Country is required";
      formValid = false;
    }

    if (data.address1 === "") {
      newErrors.address1 = "Address is required";
      formValid = false;
    }

    if (data.district === "") {
      newErrors.district = "District is required";
      formValid = false;
    }

    if (data.area === "") {
      newErrors.area = "Area is required";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return; // Stop execution if form is not valid
    }

    if (formValid) {
    try {
      dispatch(UserCardInfo(data))
      .then(()=>{
        toast('Card Added Succesfully',{
          autoClose:1000
        })
        dispatch(getUserCardInfo({user_id :user?.user[0]?._id }))
        setData({
          card_number: "",
          card_expiry: "",
          card_cvc: "",
          user_name: "",
          country: "",
          address1: "",
          address2: "",
          district: "",
          area: "",
        })
    
        onButtonClick()

      })
    } catch (error) {
      toast.error(error);
    }
    }
    
  };

  return (
    <form onSubmit={submit}>
      <div className="row" id="card">
        <div className="col-md-1 col-sm-1 col-xs-0 col-0"></div>
        <div className="col-lg-6 col-md-6 col-sm-10 col-xs-12 col-12">
          <div className="payment-title">
            <h3 style={{ color: "#709CA6" }}>
              Payment Methods &gt; Add Payment Method
            </h3>
          </div>

          <div className="payment-head mt-2">
            <p style={{ color: "#709CA6" }}>Add payment method</p>
          </div>

          <div className="py-2">
            <div className="d-grid ">
              <div className="row">
                <div className="col-lg-1 col-md-2 col-sm-2 pe-0">
                  <img
                    src={AtmImg}
                    className="img-fluid"
                    alt="..."
                    style={{ maxWidth: "35px" }}
                  />
                </div>
                <div className="col">
                  <label htmlFor="account_email" style={{ color: "#709CA6" }}>
                    Add credit or debit card
                  </label>
                </div>
              </div>

             

<input
          type="text"
          name="card_number"
          className="payment-input bg-white mt-2 py-2 rounded"
          placeholder="Card Number"
          value={data.card_number}
          onChange={(e)=>handleChange(e)}
          onFocus={handleInputFocus}
          maxLength={19} // Increased maxLength to accommodate spaces
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9]/g, "")
              .slice(0, 16) // Limit to 16 numeric characters
              .replace(/\B(?=(\d{4})+(?!\d))/g, " "); // Add space after every 4 characters
          }}
        />

              {errors.card_number && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.card_number}
                </span>
              )}
            </div>

            <div className="mt-5">
              <div className="row">
                <div className="col">
                  

<input
          type="text"
          name="card_expiry"
          className="payment-input bg-white py-2 pe-0 w-100 rounded"
          placeholder="MM/YY"
          value={data.card_expiry}
          onChange={(e)=>handleChange(e)}
          onFocus={handleInputFocus}
          maxLength={5} // Increased maxLength to accommodate spaces
          onInput={(e) => {
            let inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

            if (inputValue?.length > 2) {
              const month = inputValue.slice(0, 2);
              const year = inputValue.slice(2, 4);
              inputValue = `${month}/${year}`;
            }

            e.target.value = inputValue.slice(0,5); // Limit the input to 5 characters (MM/YY)
          }}
          
        />

                  {errors.card_expiry && (
                    <span
                      className="error text-danger mt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors.card_expiry}
                    </span>
                  )}
                </div>
                <div className="col">
                  

<input
          type="tel"
          name="card_cvc"
          className="payment-input bg-white py-2 pe-0 w-100 rounded"
          placeholder="CVC"
          value={data.card_cvc}
          onChange={(e)=>handleChange(e)}
          onFocus={handleInputFocus}
          maxLength={3} // Increased maxLength to accommodate spaces
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9]/g, "")
              .slice(0,3);
          }}
        />
                  {errors.card_cvc && (
                    <span
                      className="error text-danger mt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors.card_cvc}
                    </span>
                  )}
                </div>
               
              </div>
            </div>

            <div className="d-grid mt-5">
              <label
                htmlFor="account_confirm_password"
                style={{ color: "#709CA6" }}
              >
                Cardholder Name
              </label>
              <input
                id="account_confirm_password"
                type="text"
                className="payment-input p-2 rounded"
                name="user_name"
                pattern='[a-z A-Z-]+'
                value={data.user_name}
                onChange={(e) => handleChange(e, "user_name")}
                onFocus={handleInputFocus}
                autoComplete="none"
              />
              {errors.user_name && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.user_name}
                </span>
              )}
            </div>

            <div className="mt-5">
              <select
                required
                className="payment-input text-muted w-100 p-2 rounded"
                onChange={(e) => handleCountry(e, "country")}
                value={data?.country}
              >
                {countries?.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors?.country && (
                <span
                  className="error text-danger mt-1 rounded p-2"
                  style={{ fontSize: "14px" }}
                >
                  {errors?.country}
                </span>
              )}
            </div>

            <div className="d-grid mt-5">
              <label htmlFor="account_address1" style={{ color: "#709CA6" }}>
                Address 1
              </label>
              <input
                id="account_address1"
                type="text"
                className="payment-input p-2 rounded"
                name="address1"
                value={data.address1}
                onChange={(e) => handleChange(e, "address1")}
                autoComplete="none"
              />
              {errors.address1 && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.address1}
                </span>
              )}
            </div>

            <div className="d-grid mt-5">
              <label htmlFor="account_address2" style={{ color: "#709CA6" }}>
                Address 2
              </label>
              <input
                id="account_address2"
                type="text"
                className="payment-input p-2 rounded"
                name="address2"
                value={data.address2}
                onChange={(e) => handleChange(e, "address2")}
                autoComplete="none"
              />
              {errors.address2 && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.address2}
                </span>
              )}
            </div>

            <div className="d-grid mt-5">
              <label htmlFor="account_district" style={{ color: "#709CA6" }}>
                District
              </label>
              <input
                id="account_district"
                type="text"
                className="payment-input p-2 rounded"
                name="district"
                value={data.district}
                onChange={(e) => handleChange(e, "district")}
                autoComplete="none"
              />
              {errors.district && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.district}
                </span>
              )}
            </div>

            <div className="d-grid mt-5">
              <label htmlFor="account_area" style={{ color: "#709CA6" }}>
                Area
              </label>
              <input
                id="account_area"
                type="text"
                className="payment-input p-2 rounded"
                name="area"
                value={data.area}
                onChange={(e) => handleChange(e, "area")}
                autoComplete="none"
              />
              {errors.area && (
                <span
                  className="error text-danger mt-1"
                  style={{ fontSize: "14px" }}
                >
                  {errors.area}
                </span>
              )}
            </div>

            <div className="d-grid mt-5">
              <button
                type="submit"
                className="payment-btn btn btn-primary"
                style={{ backgroundColor: "#709CA6", marginBottom: "4px", borderColor:"#709CA6" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-5">

        <Cards
        number={data.card_number}
        expiry={data.card_expiry}
        cvc={data.card_cvc}
        name={data.user_name}
        focused={data.focus}
      />
        </div>

      </div>
    </form>
  );
};

export default StripePayment;
