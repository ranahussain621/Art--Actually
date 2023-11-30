import React from 'react'
import './welcome.css'
import img1 from '../../assets/images/mainLogo.png'
import { Button } from "@mui/material";
import { BsFillCheckCircleFill } from "react-icons/bs"
import {  useNavigate } from 'react-router-dom';




const Welcome = () => {

    const navigate = useNavigate()
    const loginPage = () => {
        navigate('/')
    } 


    return (
        <>
            <div className="container">
                <div className="card text-center shadow p-5 container">
                    <div className="text-cneter container" >
                        <img src={img1} alt="" className='img-fluid img-responsive' />



                        <p className='mt-5 mb-5 email-varified openSans-400'>  <span>
                            <BsFillCheckCircleFill style={{ fontSize: "55px", color: "green", marginRight: "20px" }} className='icon' />
                        </span>Email Verified</p>

                        <p className='welcome-font mt-4 openSans-300  px-3 mx-auto' style={{ maxWidth: '600px',textAlign:"justify" }}>
                            It is a long established fact that a The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                        <Button
                            variant="contained"
                            type="button"


                            sx={{
                                color: "#fff",
                                background: "#709AA4",
                                borderRadius: "8px",
                                textTransform: "capitalize",
                                marginTop:"10px",
                                marginBottom:"10px",
                                "&:hover": {
                                    background: "#709AA4",
                                },
                            }}

                            onClick={loginPage}
                        >
                            Login to Your Account
                        </Button>
                        <p className='welcome-font mt-4 openSans-300 px-3 mx-auto' style={{ maxWidth: '600px',textAlign:"justify" }}>
                            It is a long established fact that a  as opposed to using 'Content here, content here', making it look like readable English.
                        </p>

                        <h4 className='mt-5 openSans-400' style={{color:' #709BA5'}}>Thank You!   Art Actually</h4>
                        
                    </div>


                </div>

            </div>
        </>
    )
}

export default Welcome
