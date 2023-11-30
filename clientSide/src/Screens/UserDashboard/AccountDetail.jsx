import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAccountDetail } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const AccountDetail = () => {
  const user = localStorage.getItem('user');
  const USER = user ? JSON.parse(user) : null;
  const [data, setData] = useState({
    user_id: USER?.user[0]?._id,
    bankName: '',
    branchNumber: '',
    routingNumber: '',
    bankAccountNumber: '',
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ''); 

  // Set the input field with the cleaned numeric value
      setData({ ...data, [name]: numericValue });
  };
   const handleText = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
   }

  const validateForm = () => {
    const errors = {};

    // Add your validation rules here
    if (!data.bankName) {
      errors.bankName = 'Bank Name is required';
    }

    if (!data.branchNumber) {
      errors.branchNumber = 'Branch Number is required';
    } else if (data.branchNumber.length !== 3) {
      errors.branchNumber = 'Branch Number must be exactly 3 digits';
    }

    if (!data.routingNumber) {
      errors.routingNumber = 'Routing Number is required';
    } else if (data.routingNumber.length !== 5) {
      errors.routingNumber = 'Routing Number must be exactly 5 digits';
    }

    if (!data.bankAccountNumber) {
      errors.bankAccountNumber = 'Account Number is required';
    } else if (data.bankAccountNumber.length !== 7) {
      errors.bankAccountNumber = 'Account Number must be exactly 7 digits';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Form is valid if there are no errors
  };

  const submit = async () => {
    if (validateForm()) {
      try {
        await dispatch(userAccountDetail(data)).then((res) => {
          toast.success(res.payload.message);
          setData({
            bankName: '',
            branchNumber: '',
            routingNumber: '',
            bankAccountNumber: '',
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
     
        <div className="container pt-0 mt-0">
          <div className="row openSans-500" style={{ color: '#CACED8', fontWeight: '500' }}>
            <div className="col-md-9 col-lg-9 col-sm-4 fs-5"> Add Your Bank Account Details</div>
          </div>
          <div className="py-2">
            <div className="form-group py-2">
              <label htmlFor="account_email" className="openSans-400" style={{ color: '#709CA6' }}>
                Bank Name
              </label>
              <input
                id="account_email"
                type="text"
                className={`form-control my-1 ${errors.bankName ? 'is-invalid' : ''}`}
                placeholder="Bank Name"
                name="bankName"
                value={data.bankName}
                onChange={handleText}
                autoComplete="none"
              />
              {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
            </div>

            <div className="form-group py-2">
              <label htmlFor="account_confirm_password" className="openSans-400" style={{ color: '#709CA6' }}>
                Branch Number
              </label>
              <input
                id="account_confirm_password"
                type="text"
                className={`form-control my-1 ${errors.branchNumber ? 'is-invalid' : ''}`}
                placeholder="Branch Number"
                name="branchNumber"
                value={data.branchNumber}
                onChange={handleChange}
                autoComplete="none"
                minLength={3}
                maxLength={3}
              
              />
              {errors.branchNumber && <div className="invalid-feedback">{errors.branchNumber}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="account_new-password" className="openSans-400" style={{ color: '#709CA6' }}>
                Routing Number
              </label>
              <input
                id="account_new-password"
                type="text"
                className={`form-control my-1 ${errors.routingNumber ? 'is-invalid' : ''}`}
                placeholder="Routing Number"
                name="routingNumber"
                value={data.routingNumber}
                onChange={handleChange}
                autoComplete="none"
                minLength={5}
                maxLength={5}
              />
              {errors.routingNumber && <div className="invalid-feedback">{errors.routingNumber}</div>}
            </div>

            <div className="py-2">
              <div className="form-group">
                <label htmlFor="account_new-password" className="openSans-400" style={{ color: '#709CA6' }}>
                  Account Number
                </label>
                <input
                  id="account_new-password"
                  type="text"
                  className={`form-control my-1 ${errors.bankAccountNumber ? 'is-invalid' : ''}`}
                  placeholder="Account Number"
                  name="bankAccountNumber"
                  value={data.bankAccountNumber}
                  onChange={handleChange}
                  autoComplete="none"
                  minLength={7}
                maxLength={7}
                />
                {errors.bankAccountNumber && <div className="invalid-feedback">{errors.bankAccountNumber}</div>}
              </div>
            </div>
            <div className="mt-3">
              <button className="btn " style={{ color: 'white', backgroundColor: '#709CA6' }} onClick={submit}>
               Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
