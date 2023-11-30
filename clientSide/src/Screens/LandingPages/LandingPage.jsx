import React, { useEffect, useState } from 'react'
import Carousel from '../../Components/carousel.jsx'
import banner from "../../assets/images/banner.png"
import './landingPage.css'

import LandingSideBar from '../../Components/LandingSideBar.jsx'
import { useDispatch } from 'react-redux'
import { EventDetail } from '../../redux/features/EventSlice.js'
import ExibitonDetail from './ExibitonDetail.jsx'
const LandingPage = () => {

  const [editModal, seteditModal] = useState()
  const [docId, setdocId] = useState()


  const [detail, setdetail] = useState({
    name: "",
    description: "",
    url: '',
    location: '',
    exhibitionId: '',
    startDate: '',
    endDate: '',
    image: '',
    user_id: ''
  });

  const dispatch = useDispatch()
  useEffect(() => {
    const value = async () => {
      const val = await dispatch(EventDetail({ status: "progress" }))
      const data = val?.payload?.data

      if (data) {
        setdetail((prev => ({
          ...prev,
          name: data?.name,
          description: data?.description,
          url: data?.url,
          location: data?.location,
          exhibitionId:data?._id,
          startDate: data?.startDate,
          endDate: data?.endDate,
          image: data?.image,
          user_id: data?.user_id
        })))
      }

    }
    value()

  }, [])

  function editModalScreen() {
    setdocId(detail?.exhibitionId)
    seteditModal(!editModal)
    }

  const imagepath = detail?.image
  return (
    <>

      <Carousel />
      {/* banner */}
      <div className="container-fluid p-0">
        <div className="col-12 w-100">
          <div style={{

            backgroundImage: `url(${detail?.image ? imagepath : banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '500px'

          }}
            className="d-flex align-items-center justify-content-center mt-1">
            {/* Content */}
            <div>
              <p className=" text-center virtual w-100 ">{detail?.name ? detail?.name : 'VIRTUAL EXIBITOIN'}</p>
              <div className="d-flex align-items-center gap-4">
                {/* <img className='img-fluid' src={dashed} alt="" />  */}
                <div className="d-flex align-items-center gap-4 banner">

                </div>
                {detail?.description ? (<p className=' m-0 fs-5 openSans-400' style={{ color: 'white' }}>{detail?.description}</p>)
                  :
                  (<div className='d-flex align-items-center gap-4 w-100'>
                    <div className='w-100' style={{ borderTop: '10px  dashed #709DA7' }}></div>
                    <div className="w-100">
                      <h4
                        style={{
                          color: "#709DA7",

                        }}
                      >
                        COMING SOON
                      </h4>
                    </div>
                  </div>


                  )}


                <button
                  style={{
                    background: "#709DA7",
                  }}
                  onClick={editModalScreen}
                  disabled={!detail?.name }
                  className="btn btn-md-lg btn-sm-sm btn-xs-sm rounded-pill fs-md-5 fs-sm-3 fw-semibold text-white px-md-5 py-md-3 px-sm-3 py-sm-2 "
                >
                  More Details
                </button>

              </div>
            </div>
{detail?.name &&
<div className='badge'
style={{
 
  height: '100%'
}}
>
  <div className="d-flex py-4  px-3  rounded-3 jusity-content-between w-100 " style={{background:'#26B893'}}>
    <div className="d-flex">
       <div className="mx-2">
      <p className='openSans-500 fw-bold fs-4'>Start Date</p>
      <p className='openSans-500 fs-5'>{detail?.startDate}</p>
      </div>
    <div className="mx-2">
      <p className='openSans-500 fw-bold fs-4'>End Date</p>
      <p className='openSans-500 fs-5'>{detail?.endDate}</p>
      </div>
    </div>
   
  </div>
</div>
}

          </div>

        </div>

        {/* art show */}
        <div className="col-md-12">
          <div className="row justify-content-end">
            <div className="col-md-11">
              <LandingSideBar />
            </div>
          </div>
        </div>


      </div>
      <ExibitonDetail
        ID={docId}
        closeModal={editModalScreen}
        ModalIsOpen={editModal}
      />

    </>

  )
}
export default LandingPage;