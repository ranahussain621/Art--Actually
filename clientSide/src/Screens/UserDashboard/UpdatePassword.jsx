import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { newPassword } from '../../redux/features/auth/authSlice';


const UpdatePassword = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    const [passwordData, setPasswordData] = useState({
      id: user?.user[0]._id,
      newpassword: '',
      confirmpassword: '',
    });
  
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
  
    const dispatch = useDispatch();
  
    const handlePasswordChange = (e) => {
      const { name, value } = e.target;
      setPasswordData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const sendPasswordData = async () => {
      // Reset validation errors and success message
      setValidationErrors({});
      setSuccessMessage('');
  
      // Validation checks
      if (!passwordData.newpassword) {
        setValidationErrors({ newpassword: 'New password is required' });
        return;
      }
      if (passwordData.newpassword !== passwordData.confirmpassword) {
        setValidationErrors({ confirmpassword: 'Passwords do not match' });
        return;
      }
  
      // If validation passes, dispatch the action and handle success/failure
      dispatch(newPassword(passwordData))
        .then((res) => {
          toast.success(res.payload.message,{autoClose:1000});
          setSuccessMessage(res.payload.message);
          setPasswordData({
            newpassword: '',
            confirmpassword: '',
          });
        })
        .catch((error) => {
          toast.error(error,{autoClose:1000});
        });
    };
  
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="col-md-6 col-sm-6">
            <h4 className="fs-3 openSans-800" style={{ fontWeight: '600', color: '#CACED8', fontSize: '24px' }}>
              Update Password
            </h4>
          </div>
          <div className="row mt-4">
            <div className="col">
              <div className="row">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label openSans-500" style={{ color: '#083A50', fontWeight: '500', lineHeight: '19.6px', fontSize: '16px' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control w-25"
                    style={{ border: '1px solid #CACED8' }}
                    name="newpassword"
                    onChange={handlePasswordChange}
                    id="exampleFormControlInput1"
                  />
                  {validationErrors.newpassword && <span className="text-danger">{validationErrors.newpassword}</span>}
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput2" className="form-label openSans-500" style={{ color: '#083A50', fontWeight: '500', lineHeight: '19.6px', fontSize: '16px' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control w-25"
                    style={{ border: '1px solid #CACED8' }}
                    name="confirmpassword"
                    onChange={handlePasswordChange}
                    id="exampleFormControlInput2"
                  />
                  {validationErrors.confirmpassword && <span className="text-danger">{validationErrors.confirmpassword}</span>}
                </div>
                <div className="w-100 mt-3">
                  <button type="button" className="btn " style={{ fontWeight: '500', color: '#fff', background: '#709AA4' }} onClick={sendPasswordData}>
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  
  export default UpdatePassword