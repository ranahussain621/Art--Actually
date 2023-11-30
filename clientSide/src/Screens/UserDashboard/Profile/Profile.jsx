import React,{useEffect, useState} from 'react';
import styles from './Profile.module.css';
import profile from '../../../assets/images/profile.jpg'
 
import {useSelector,useDispatch} from 'react-redux'
import { getUserDetails } from '../../../redux/features/auth/authSlice';

const Profile = ({onButtonClick}) => {
    
 
   
   

     const updatedUserDetail = useSelector((state)=>state.auth.userDetail);

     const [UserDetailData, setUserDetailData] = useState()
     const USER = JSON.parse(localStorage.getItem('user'))
     const userID =USER?.user[0]?._id
     
     
     const dispatch = useDispatch()


     useEffect(()=>{
      const data = async()=>{
      
      await dispatch(getUserDetails({id:userID}))
    
      }
      data()
     
    },[userID,dispatch])

useEffect(()=>{
  if(updatedUserDetail){
    setUserDetailData(updatedUserDetail?.user)
  }
},[updatedUserDetail])



  return (
    <div className="container-fluid col-md-12">
        <div className="row">
 
    
    
        <div className="row">
       
          {/* start left side------------------------------------- */}
          <div className="col-md-6 pe-md-5" >
     
            <img
         
              src={UserDetailData?.image ? UserDetailData?.image[0] : profile}
              className={`${styles.ProfileEllipseLogo} rounded-circle border shadow`}
              alt="profile screeen logo"
            />
            {/* start contact info container---------------------------------- */}
            <div className={styles.containerStyleLeftSide}>
              <div className="d-flex flex-column gap-2 ">
                <div>
                  <p className={`${styles.labelText} openSans-400`}>Name</p>
                  <p className={`${styles.contactText} openSans-300`}>{UserDetailData?.firstName} {UserDetailData?.lastName}</p>
                </div>
                <div>
                  <p className={`${styles.labelText} openSans-400`}>Email</p>
                  <p className={`${styles.contactText} openSans-300`}>{UserDetailData?.email}</p>
                </div>
                <div>
                  <p className={`${styles.labelText} openSans-400`}>Phone Number</p>
                  <p className={`${styles.contactText} openSans-300`}>{UserDetailData?.phone ? UserDetailData?.phone : '+14 000 000000'}</p>
                </div>
              </div>
            </div>
            {/* end contact info container---------------------------------- */}
            {/* start About info container---------------------------------- */}
            <div className={styles.containerStyleLeftSide}>
              <p className={`${styles.labelText} openSans-400`}>About John</p>
              <p className={`${styles.contactText} openSans-300`} style={{ textAlign: 'justify',letterSpacing:'0.1px', columnCount:1 }}>
              Meet John, a passionate and accomplished artist who turns blank 
              canvases into captivating stories with every brushstroke. With an
               innate ability to infuse life into his creations, John's artwork
                resonates with emotions, colors, and forms that effortlessly
                 transcend the ordinary. His portfolio is a rich tapestry of vivid landscapes, thought-provokin
              </p>
            </div>
            {/* end About info container---------------------------------- */}

            {/* start legal info container---------------------------------- */}
            <div className={styles.containerStyleLeftSide}>
              <p className={`${styles.labelText} openSans-400`}>Legal</p>
              <div className="d-flex gap-4 mt-4">
                <div className="col-md-5 me-auto">
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Member</p>
                    <div className={styles.greenRoundedBox}>
                      <p  className={styles.roundedBoxText}>{UserDetailData?.vip === 'false' ? 'Simple' : 'VIP'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Awards</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxTextLonger}>{UserDetailData?.awards ? UserDetailData?.awards : 'Verified' }</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Style</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.style ? UserDetailData?.style : '0'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Solo Exhibition</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.solo_exhibition ? UserDetailData?.solo_exhibition : '0'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Group Exhibition</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.group_exhibition ? UserDetailData?.group_exhibition : '0'}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 ms-auto">
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Commisions</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxTextLonger}>{UserDetailData?.commisions ? UserDetailData?.commisions : 'Square Inch'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Awards</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.awards ? UserDetailData?.awards : '0'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Residencies</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.Residencies ? UserDetailData?.Residencies : '0'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Publications</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.Publications ? UserDetailData?.Publications : '0'}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className={`${styles.contactText} openSans-400`}>Collections</p>
                    <div className={styles.whiteRoundedBox}>
                      <p className={styles.roundedBoxText}>{UserDetailData?.Collections ? UserDetailData?.Collections : '0'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
        
          <div className="col-md-6 ps-md-5">
            <div className='w-100 text-end'>
              <button className='btn ' type='submit'
                style={{fontWeight:'500',color:"#fff",background:'#709AA4' , cursor:'pointer'}}
              onClick={onButtonClick}>Edit Profile </button>
            </div>
           
      
            {/* <p className={styles.rightSidePaddedLableText}>Total Experience</p>
            <div className={styles.rightSideMainBoxOfIcon}>
              <div className="d-flex  justify-content-between align-items-center">
                <div className=" ms-3">
                  <p className={`${styles?.leftSideBoxesHeading} mt-2 openSans-400`}>
                    7 Years
                  </p>
                  <p className={`${styles.leftSideBoxesPara} openSans-400`}>
                    of total experience
                  </p>
                </div>
                <div className={styles.leftSideIconBoxRed}>
                  <img
                    src={MedalStar}
                    alt=""
                    className={styles.leftSideIconOfBox}
                  />
                </div>
              </div>
            </div> */}
            {/* end Total Experience container---------------------------------- */}

            {/* start Ratings container---------------------------------- */}
            {/* <p className={styles.rightSidePaddedLableText}>Ratings</p>
            <div className={styles.rightSideMainBoxOfIcon}>
              <div className="d-flex  justify-content-between align-items-center">
                <div className=" ms-3">
                  <p className={`${styles.leftSideBoxesHeading} mt-2`}>
                    4 Stars
                  </p>
                  <p className={`${styles.leftSideBoxesPara} openSans-400`}>from 34 customers</p>
                </div>
                <div className={styles.leftSideIconBoxYellow}>
                  <img src={Star} alt="" className={styles.leftSideIconOfBox} />
                </div>
              </div>
            </div> */}
            {/* end Ratings container---------------------------------- */}

            {/* start Customer Reviews container---------------------------------- */}
            {/* <p className={styles.rightSidePaddedLableText}>Customer Reviews</p>
            <div className={styles.rightSideMainBoxOfIcon}>
              <div className=" ms-3">
                <p className={`${styles.leftSideBoxesHeading} mt-2`}>
                  Abigail Morris
                </p>
                <div className="d-flex gap-2">
                  <BiSolidStar size={17} color="gold" />
                  <BiSolidStar size={17} color="gold" />
                  <BiSolidStar size={17} color="gold" />
                  <BiSolidStar size={17} color="gold" />
                  <BsStarHalf size={17} color="gold" />
                </div>
                <p className={`${styles.leftSideBoxesParaLast} openSans-400`} style={{ textAlign: 'justify' }}>
               
                </p>
              </div>
            </div> */}
            {/* end Customer Reviews container---------------------------------- */}
          </div>
          {/* end left side------------------------------------- */}
        </div>
      </div>
 
 
    </div>
  
 
  );
};

export default Profile;
