import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import visa from "../../assets/images/visa.png";
import nu from "../../assets/images/nu.png";
import debed from "../../assets/images/debid.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./donate.css";
import { useDispatch, useSelector } from "react-redux";
import {addItemCart ,getAllSound,getArtDetails,} from "../../redux/features/auth/authSlice";
import { baseURL } from "../../redux/axios/axios";
import {toast} from 'react-toastify'
import img from '../../assets/images/music4.png'


const Donate = () => {

       const USER = JSON.parse(localStorage.getItem("user"))
       
      
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);

  const [selectedAmount, setSelectedAmount] = useState("");
  const [detail, setdetail] = useState()
  

  const art_id = queryParams.get("art_id");
  const music_id = queryParams.get("music_id");
  const user_id = location.state?.user_id;
  const title = location.state?.title;
  const pic = location.state?.image;

 

  // const userList = useSelector((state) => state.auth.userList);

  useEffect(() => {
    if (art_id) {
      const getdata = async()=>{
        const val =await  dispatch(getArtDetails({ id: art_id }));
        const data = val.payload?.data
        setdetail(data)
      }
      getdata()
    
    }
    if(music_id){
      dispatch(getAllSound())
    }
  }, [art_id,music_id,dispatch]);

  const GiveDonate = async () => {
    if(USER && art_id){
      await dispatch(
        addItemCart({
          amount: selectedAmount,
          art_id,
          user_id,
        })
      
      )
        .then(()=>{
          navigate('/checkout',{state:{amount:selectedAmount,art_id:art_id}})
        })

    }

    if(USER && music_id){
      await dispatch(
        addItemCart({
          amount: selectedAmount,
          music_id,
          user_id,
        })
      )
      .then(()=>{
        navigate('/checkout',{state:{amount:selectedAmount,music_id:music_id}})
      })
    }

    if(!USER){
      toast('Login Required!',{
        autoClose:1000
      })
      navigate('/')
    }
   
  };

  return (
    <div className="container mt-5 " style={{ padding: "20px 0px" }}>
    

      <div className="row mt-4">
        <div
          className="row mt-5"
          style={{
            background: "#fff",
            borderRadius: "8px",
            border: "3px solid #9f9f9f",
            borderTop: "none",
            padding: { xs: "20px", lg: "80px 130px" },
            mt: "100px",
          }}
        >
          <div className="col-md-7 col-sm-12 my-5">
            <div
              style={{
                paddingBottom: "15px",
                borderBottom: "2px solid #ddd",
              }}
            >
              <Typography
                style={{
                  fontSize: "35px",
                  fontWeight: "500",
                }}
              >
                Support Art Fund
              </Typography>
             
            </div>

            <div className="my-5">
              <div className="d-flex align-items-top">
                <div>
                  <Typography
                    style={{
                      fontSize: "45px",
                      color: "#1A1F36",
                      fontWeight: "600",
                      textDecoration: "underline",
                    }}
                  >
                    
                    <img
                     src={pic ? pic[0] : img }
                      alt="No Data"
                      style={{ height: "250px", width: "250px" }}
                    />
                  </Typography>
                </div>
                <div className="ps-3">
                  <h2
                    style={{
                      fontWeight: "600",
                      fontSize: "24px",
                      color: "#000000",
                    }}
                  >
                    {title}
                    <span className="text-muted fs-5 px-2">by</span>{" "}
                    <span style={{}} className="fs-4">
                      {detail?.artist}
                    </span>
                  </h2>
                  <Typography style={{ color: "#709AA4" }}>
                    {detail?.description}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-5 col-sm-12 my-5"
            style={{
              padding: "0px 75px",
              paddingLeft: {
                xs: "0px",
                lg: "50px",
              },
            }}
          >
            <Box
              style={{
                boxShadow: "0px 0px 10px -5px #000",
                padding: "30px 60px",
                borderRadius: "8px",
              }}
            >
             
              <Box class="my-2">
                <Typography
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                  }}
                >
                  Donation Amount
                </Typography>
                <Typography
                  style={{
                    fontSize: "18px",
                    color: "#709AA4",
                  }}
                >
                  Every donation we receive keeps art accessible.
                </Typography>
              </Box>

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  onClick={() => setSelectedAmount("25")}
                  className={selectedAmount === "$25" ? "selected-amount" : ""}
                  style={{
                    cursor: "pointer",
                    fontSize: "25px",
                    fontWeight: "500",
                    color: "#231F20",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  $25
                </Typography>
                <Typography
                  onClick={() => setSelectedAmount("50")}
                  className={selectedAmount === "$50" ? "selected-amount" : ""}
                  style={{
                    cursor: "pointer",
                    fontSize: "25px",
                    fontWeight: "500",
                    color: "#231F20",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  $50
                </Typography>
                <Typography
                  onClick={() => setSelectedAmount("100")}
                  className={selectedAmount === "$100" ? "selected-amount" : ""}
                  style={{
                    cursor: "pointer",
                    fontSize: "25px",
                    fontWeight: "500",
                    color: "#231F20",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  $100
                </Typography>
              </Box>

              <Box class="my-5">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="$ other amount"
                  id=""
                  value={selectedAmount}
                  onChange={(e) => {
                    setSelectedAmount(e.target.value);
                   
                  }}
                />
              </Box>

              <Box class="my-5">
                <Button
                  className={
                     !selectedAmount ? "fade-button" : ""
                  }
                  variant="contained"
                  fullWidth
                  style={{
                    color: "#fff",
                    background: "#709AA4",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#709AA4",
                    },
                  }}
                  onClick={GiveDonate}
                  disabled={ !selectedAmount }
                >
                  Donate
                </Button>
              </Box>
            </Box>

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                mt: "20px",
              }}
            >
              <Box>
                <img
                  style={{
                    width: "60px",
                    height: "auto",
                  }}
                  src={visa}
                  className="img-fluid"
                  alt=""
                />
              </Box>
              <Box>
                <img
                  style={{
                    width: "60px",
                    height: "auto",
                  }}
                  src={debed}
                  className="img-fluid"
                  alt=""
                />
              </Box>
              <Box>
                <img
                  style={{
                    width: "60px",
                    height: "auto",
                  }}
                  src={nu}
                  className="img-fluid"
                  alt=""
                />
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
