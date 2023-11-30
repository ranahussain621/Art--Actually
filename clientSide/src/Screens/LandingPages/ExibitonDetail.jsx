




import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { EventDetail } from "../../redux/features/EventSlice";



const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        width: "70%",
        transform: "translate(-50%, -50%)",
    },
};

const ExibitonDetail = ({ ModalIsOpen, closeModal, ID }) => {

    const dispatch = useDispatch();
    const [detail, setdetail] = useState({
        name: "",
        description: "",
        url: '',
        location: '',
        exhibitionId: '',
        startDate: '',
        endDate: '',
        image: null,
        user_id: ''
    });


    useEffect(() => {
        const value = async () => {
            const val = await dispatch(EventDetail({ exhibitionId: ID }))
            const data = val.payload?.data

            if (data) {
                setdetail((prev => ({
                    ...prev,
                    name: data[0]?.name,
                    description: data[0]?.description,
                    url: data[0]?.url,
                    location: data[0]?.location,
                    exhibitionId: data[0]?._id,
                    startDate: data[0]?.startDate,
                    endDate: data[0]?.endDate,
                    image: data[0]?.image,
                    user_id: data[0]?.user_id
                })))
            }

        }
        value()

    }, [ID])



    const openScr = (item) => {
        window.open(item)
    }









    return (
        <Box >
            <Modal 
                isOpen={ModalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box sx={{padding:'20px'}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",

                        }}
                    >
                        <Typography variant="h5"
                            className=" w-100"
                            sx={{ fontWeight: "600", color: "#709AA4" }}>
                            Exibition Detail
                        </Typography>

                        <IconButton
                            className="  d-flex justify-content-end"
                            onClick={closeModal} aria-label="delete">
                            <CloseIcon sx={{ color: "#0000009e" }} />
                        </IconButton>

                    </Box>



                    <Box>
                        <div className="row m-0 p-0">
                            <div className="col-6 row justify-content-center">

                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >Title</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0">{detail?.name}</p>
                                    </div>

                                </div>

                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >Description</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0">{detail?.description}</p>
                                    </div>

                                </div>
                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >Location</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0">{detail?.location}</p>
                                    </div>

                                </div>

                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >Url</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0"><a href="#" onClick={()=>openScr(detail?.url)}>{detail?.url}</a></p>
                                    </div>

                                </div>

                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >Start Date</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0">{detail?.startDate}</p>
                                    </div>

                                </div>

                                <div className="row mt-3 justify-content-between">
                                    <div className="col-6  row justify-content-center">
                                        <div className="col-6">
                                            <p className="title openSans-600 fs-5 m-0 " style={{ color: '#709AA4' }} >End Date</p>
                                        </div>

                                    </div>

                                    <div className="col-6 d-flex align-items-center ">
                                        <p className="openSans-400 text-muted  m-0">{detail?.endDate}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-6 m-0  p-0">
                                <div className="top-image d-flex justify-content-center align-items-center">
                                    <img src={detail?.image} className="img-fluid" style={{ width: '600px' }} alt="" />
                                </div>
                            </div>
                        </div>





                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default ExibitonDetail;
