import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import MyFavouriteDropDown from './MyFavouriteDropDown';
import DeleteMusicModal from './DeleteMusicModal';
import '../../Styles/deleteartModal.css';
import EditMusicDetails from './uploadMusicFile/EditMusicDetails';
import { useDispatch } from 'react-redux';
import { ConfirmDeleteUserSound, DownloadMusic, getArtDetails, getUserSound } from '../../redux/features/auth/authSlice';
import EditUserUploadArt from '../../Screens/UserDashboard/UserUploadArt/EditUserUploadArt';
import DeleteArtModal from './DeleteArtModal';

const SelectedBoxOptions = ({ selectedCheckboxes,currentTab }) => {
  const [deleteArtOpen, setDeleteArtOpen] = useState(false);
  const [editArtOpen, setEditArtOpen] = useState(false);
  const [confirmData, setConfirmData] = useState([]);
  const [userartdata, setuserartdata] = useState()



  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user[0]._id;

  const deleteArtOpenScreen = async () => {
    if(currentTab==='Artwork'){
await dispatch(getArtDetails({id:selectedCheckboxes}))
.then((res)=>{
setuserartdata(res?.payload?.data)
setDeleteArtOpen(!deleteArtOpen);
})


    }
    else{
       const ConfirmData = await dispatch(ConfirmDeleteUserSound({ soundIds: selectedCheckboxes }) );
    await dispatch(  getUserSound({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        user_id,
      })
    );
    setConfirmData(ConfirmData.payload.sounds);
    setDeleteArtOpen(!deleteArtOpen);
    }

   
  };



  const editArtOpenScreen = () => {
    setEditArtOpen(!editArtOpen);
  };

  const download = async () => {
    const response = await dispatch(DownloadMusic({ soundIds: selectedCheckboxes }));
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'songs.zip';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (selectedCheckboxes?.length === 0) {
      setDeleteArtOpen(false);
      setEditArtOpen(false);
    }
  }, [selectedCheckboxes]);

  return (
    <>
      {selectedCheckboxes?.length > 0 && (
        <div className="container-fluid text-center align-items-center py-2 text-white" style={{ background: '#74A8B0' }}>
          <div className="row ">
            <div className="col-md-1 mx-4 d-flex ps-4 border-end text-center align-items-center justify-content-end">
               <span className="text-white" style={{ borderRadius: '10px' }}>
                {selectedCheckboxes ? selectedCheckboxes?.length : 'Selected'}
              </span> 
              <p className="ps-1 mb-0">Selected</p>
            </div>
            <div className="col-md-2 d-flex border-end align-items-center">
              <MyFavouriteDropDown selectedCheckboxes={selectedCheckboxes} />
            </div>
            <div type="button" onClick={editArtOpenScreen} className="col-md-2 d-flex border-end align-items-center">
              <div className="ps-2">
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
              <p className="ps-2  mb-0">Edit Details</p>
            </div>
            <div className="col-md-2 d-flex border-end align-items-center" type="button" onClick={download}>
              <div className="ps-2">
                <FontAwesomeIcon icon={faDownload} />
              </div>
              <p className="ps-2  mb-0">Download</p>
            </div>
            <div type="button" onClick={deleteArtOpenScreen} className="col d-flex border-end align-items-center">
              <div className="ps-2">
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
              <p className="ps-2  mb-0">Delete</p>
            </div>
          </div>
        </div>
      )}

      {deleteArtOpen && (
        <div className="modalFordeleteArtOpen">
          <div className="modal-contentFordeleteArtOpen">
            {currentTab ==='Artwork' ?
          <DeleteArtModal closeWindow={deleteArtOpenScreen} confirmData={userartdata} />  
          :
           <DeleteMusicModal closeWindow={deleteArtOpenScreen} confirmData={confirmData} />
          }
           
          </div>
        </div>
      )}

      {editArtOpen && (
        <div className="modalForUpdateArtOpen">
          <div className="modal-contentForUpdateArtOpen">
          {currentTab === 'Artwork' ? (
              <EditUserUploadArt closeWindow={editArtOpenScreen} selectedCheckboxes={selectedCheckboxes} />
            ) : (
              <EditMusicDetails closeWindow={editArtOpenScreen} selectedCheckboxes={selectedCheckboxes} />
            )}
          </div>
        </div>
      )}

   
    </>
  );
};

export default SelectedBoxOptions;
