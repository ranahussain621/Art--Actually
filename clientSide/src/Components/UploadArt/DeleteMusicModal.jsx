import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteUserSound,getUserSound } from '../../redux/features/auth/authSlice';
import {toast} from 'react-toastify';
import { baseURL } from '../../redux/axios/axios';


const DeleteMusicModal = ({ closeWindow, confirmData }) => {


  const User = JSON.parse(localStorage.getItem('user'))
  const user_id = User?.user[0]._id


  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const ids = confirmData?.map((item) => item?._id);
 
  const getUpdatedValue= async()=>{
    await dispatch(getUserSound({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          user_id,
        }));
      
  }

  const DeleteSound = async () => {
   await dispatch(DeleteUserSound({ ids }))
      .then(() => {
        closeWindow();
        getUpdatedValue()
        toast.success('Deleted Successfully', {
          position: "top-center",
          autoClose: 1000,
        });
  
     

      
      });
  };
  

 

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <div className="card border-0">
        <div className="card-body">
          <div className="row">
            <p className="fw-bold fs-3" style={{ color: '#74A8B0' }}>
              Permanently delete this music?
            </p>
          </div>
          <div className="rounded-3 py-3" style={{ border: '3px solid #74A8B0' }}>
            {confirmData?.map((sound, i) => {
              return (
                <div className="rana d-flex justify-align-center align-items-center" key={i}>
                  <div>
                    <audio src={sound.file[0]} controls />
                  </div>

                  <div className="d-flex align-items-center px-4">
                    <p className="m-0 fw-semibold">{sound.title}</p>
                  </div>
                  <div className="d-flex align-items-center pe-4">
                    <p className="m-0 fw-semibold" style={{ color: '#74A8B0' }}>
                      23 May 2023
                    </p>
                  </div>
                  <div className="d-flex align-items-center pe-5">
                    <p className="m-0 fw-semibold" style={{ color: '#74A8B0' }}>
                      15 Views
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkbox */}
          <div className="form-check my-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              id="defaultCheck1"
            />
            <label
              className="form-check-label"
              style={{ color: '#74A8B0' }}
              htmlFor="defaultCheck1"
            >
              I understand that deleting music from ARTACTUALLY is permanent and cannot be undone.
            </label>
          </div>

          <div className="d-flex justify-content-end py-2">
            <div className="px-3">
              <button className="btn btn-secondary" onClick={closeWindow}>
                CANCEL
              </button>
            </div>
            <div>
              <button
                className="btn text-white"
                onClick={DeleteSound}
                style={{ backgroundColor: '#74A8B0' }}
                disabled={!isChecked} // Disable delete button ifthe checkbox is not checked
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMusicModal;
