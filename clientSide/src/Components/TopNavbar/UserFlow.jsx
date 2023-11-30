import React, { useState,useEffect } from "react";
import "./userflow.css";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getUserDetails } from "../../redux/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faRightFromBracket, faStar, faSubscript } from "@fortawesome/free-solid-svg-icons";

const UserFlow = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [UserDetailData, setUserDetailData] = useState()

  const updatedUserDetail = useSelector((state)=>state.auth.userDetail);

  const user = JSON.parse(localStorage.getItem("user"))
  
  const ID = JSON.parse(localStorage.getItem('user'))
  const user_id = ID?.user[0]._id


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector(state=>state.auth) 



  useEffect(()=>{
    const  getData =async ()=>{
    const data = await dispatch(getUserDetails({
       id:user.user[0]?._id
     }))
    } 
    getData()
   },[] )

   useEffect(()=>{
    if(updatedUserDetail){
      setUserDetailData(updatedUserDetail?.user)
    }
  },[updatedUserDetail])
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const subPlan=()=>{
    navigate(`/payment-plans/${user_id}`)
  }


  const logout = () => {
    localStorage.removeItem("user");
    toast.success("Successfully logged out!", {
      position: "top-center",
      autoClose:1000
    });
    props.isLoggedIn()
    navigate("/");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
       
        <div className="text-center text-white rounded-circle fs-4 bg-info justify-content-center align-items-center text-align-center" 
     style={{ height: '35px', width: '35px', border:'3px solid', textTransform: 'capitalize', fontWeight: '800', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3px' }}>
  {UserDetailData?.firstName[0]}
</div>


          <div className="pe-0">
            <div className={`dropdown${isDropdownOpen ? " no-border" : ""}`}>
              <button
                className="btn dropdown-toggle rounded-0 bg-transparent text-white pb-2"
                style={{ fontWeight: "600", letterSpacing: "0.9px" ,textTransform:'capitalize' }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={toggleDropdown}
              >
                {UserDetailData ? `${UserDetailData?.firstName} ` : 'No Name added'}
              </button>
              <ul className="dropdown-menu" style={{ minWidth: "200px" }}>
                <div>
                  <small
                    className="text-start text-muted ps-3"
                    style={{ fontSize: "11px", fontWeight: "600" }}
                  >
                    YOUR ACCOUNT
                  </small>
                </div>

                <div className="d-flex mt-2">
                  <div className="px-2">
                    {UserDetailData?.image[0] ? 
                      <img className='img-circle img-fluid  rounded-circle' src={UserDetailData?.image[0]} alt=""  style={{width:'40px',height:'40px'}}/>
                      :
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      class="bi bi-8-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-5.03 1.803c0-1.248-.943-1.84-1.646-1.992v-.065c.598-.187 1.336-.72 1.336-1.781 0-1.225-1.084-2.121-2.654-2.121-1.57 0-2.66.896-2.66 2.12 0 1.044.709 1.589 1.33 1.782v.065c-.697.152-1.647.732-1.647 2.003 0 1.39 1.19 2.344 2.953 2.344 1.77 0 2.989-.96 2.989-2.355Zm-4.347-3.71c0 .739.586 1.255 1.383 1.255s1.377-.516 1.377-1.254c0-.733-.58-1.23-1.377-1.23s-1.383.497-1.383 1.23Zm-.281 3.645c0 .838.72 1.412 1.664 1.412.943 0 1.658-.574 1.658-1.412 0-.843-.715-1.424-1.658-1.424-.944 0-1.664.58-1.664 1.424Z" />
                    </svg>
                  }
                    
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="fw-bold fs-5 h5 m-0">{UserDetailData?.firstName} {UserDetailData?.lastName}</p> 
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                    {User?.user?.user?.email}
                    </p>
                  </div>
                </div>

                <div>
                  <small
                    className="text-start text-muted ps-3"
                    style={{ fontSize: "11px", fontWeight: "600" }}
                  >
                    OPTIONS
                  </small>
                </div>

                <div>
                 
                  <li>
                    <Link
                      className="dropdown-item text-muted"
                      to={user?.Role?.title==='user' ?"/dashboard/user-dashboard":"/dashboard/admin-dashboard"}
                      style={{ fontWeight: "700" }}
                    >
                      <FontAwesomeIcon icon={faGauge} />
                      <span className="ps-2">My Dashboard</span>
                    </Link>
                  </li> 

                   <li>
                    <Link
                      className="dropdown-item text-muted"
                      to="/my-favorite-art-gallery"
                      style={{ fontWeight: "700" }}
                    >
                      <FontAwesomeIcon icon={faStar} />
                      <span className="ps-2">My Favourite Art Actually</span>
                    </Link>
                  </li> 

                  <li>
                    <p
                      className="dropdown-item text-muted"
                      
                      onClick={()=>subPlan()}
                      style={{ fontWeight: "700",cursor:'pointer' }}
                    >
                  <FontAwesomeIcon icon={faSubscript} />
                      <span className="ps-2">Subscription Plan</span>
                    </p>
                  </li> 

                  <li>
                    <a
                      className="dropdown-item text-muted d-flex align-items-center"
                      href="#"
                      style={{ fontWeight: "700" }}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <div className="ps-2"onClick={logout} type='button'>LogOut</div>
                    </a>
                  </li>  
                    
                 
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFlow;
