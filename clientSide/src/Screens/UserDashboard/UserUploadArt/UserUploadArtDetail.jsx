import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAllArts, getUserArts } from "../../../redux/features/auth/authSlice";
import CloseIcon from '@mui/icons-material/Close';
import UserUloadArtVisibility from "../../../Components/UploadArt/UserUploadArtVisibility";

const UserUploadArtDetail = ({selectedFile,close} )=> {

  const [processing, setProcessing] = useState(1);


  const { userList } = useSelector((state) => state.auth);
  const filterLists = useSelector((state) => state.auth.allArts);

  const user = JSON.parse(localStorage.getItem("user"));
  const _id = user?.user[0]?._id;

  const User = JSON.parse(localStorage.getItem("user"));
  const user_id = User?.user[0]._id;
   
  const Dimensions = ["CM"]
  const Materials = ["Paper"]

  const [addArt, setAddArt] = useState({
    title: "",
    description: "",
    format:'', 
    style:'',
    material :Materials[0],
    dimension1:'0',
    dimension2:'0',
    dimension3:'0',
    dimension4:Dimensions[0],
    tags:'',
    user_id: user_id,
    image:selectedFile
  });




  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const onchange = (e) => {
    const { name, value } = e.target;
    setAddArt({ ...addArt, [name]: value });
  };



  useEffect(()=>{
    const getData = async () => {
       await dispatch(getAllArts())
    }
    getData()
  },[dispatch])


  useEffect(() => {
    if (filterLists?.formates?.length > 0) {
      setAddArt((prev) => ({
        ...prev,
        format: filterLists.formates[0]._id,
      }));
    }

    if (filterLists?.styles?.length > 0) {
      setAddArt((prev) => ({
        ...prev,
        style: filterLists.styles[0]._id,
      }));
    }
  }, [userList,filterLists]);


  useEffect(() => {
    const getData = async () => {
      await dispatch(getUserArts({ user_id: _id }));
    };
    getData();
  }, [_id,dispatch ]);




 

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      title: "",
      description: "",
      tags:'',
     
    };

    if (addArt.title.trim() === "") {
      updatedErrors.title = "Title is required";
      isValid = false;
    }

    if (addArt.description.trim() === "") {
      updatedErrors.description = "Description is required";
      isValid = false;
    }
    if (addArt.tags.trim() === "") {
      updatedErrors.tags = "tags is required";
      isValid = false;
    }
   

    setErrors(updatedErrors);
    return isValid;
  };


const next = async () => {
  if (!selectedFile) {
    return;
  }

  if (!validateForm()) {
    return;
  }

  if(validateForm()){
  setProcessing(processing + 1);
  }

};








  return (
    <>

    {
      processing === 1 ? (
     <div className="row container" >
        <div className="col-md-6 col-sm-12">
          <div className="form-group my-2">
          <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
          }}
        >
          Details
        </p>
            <input
              type="text"
              onChange={onchange}
              value={addArt.title}
              className={`form-control ${errors.title && "is-invalid"}`}
              name="title"
              class="form-control"
              placeholder="title"
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="form-group my-4">
          {/* <p
          className="fw-semibold h4"
          style={{
            color: "#74A8B0",
          }}
        >
          Description
        </p> */}
            <textarea
              className={`form-control ${errors.description && "is-invalid"}`}
              onChange={onchange}
              value={addArt.description}
              name="description"
              placeholder="Any Description here"
              rows="6"
            ></textarea>
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div> 
           <div className="row">
        <div className="col py-0">
          <label htmlFor="" className="fs-5" style={{color:"rgb(116, 168, 176)"}}>Format</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={addArt.format}
    onChange={onchange}
    name="format"
    >
    {
        filterLists?.formates?.map((formates,i)=>{
            return (
                <option key={i} value={formates._id}>{formates.title}</option>
            )
        })
      }
      </select>
        </div>
        <div className="col">
        <label htmlFor="" className="fs-5" style={{color:"rgb(116, 168, 176)"}}>Style</label>
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={addArt.style}
    onChange={onchange}
    name="style"
    >
    {
        filterLists?.styles?.map((style,i)=>{
          
            return (
                <option key={i} value={style._id}>{style.title}</option>
            )
        })
      }
      </select>
        </div>
             </div>
      
            <div className="row mt-1">
        <div className="col"> 
        <label htmlFor="" className="fs-5" style={{color: "#74A8B0"}}>Dimensions</label>
        <div className="d-flex align-items-center mt-1">
          <input
              type="text"
              onChange={onchange}
              value={addArt.dimension1}
              className={`form-control ${errors.dimension1 && "is-invalid"}`}
              name="dimension1"
              class="form-control"
              placeholder="100"
            />
            
            <span className="text-muted"> <CloseIcon style={{fontSize:'13px'}} /></span>
             <input
              type="text"
              onChange={onchange}
              value={addArt.dimension2}
              className={`form-control ${errors.dimension2 && "is-invalid"}`}
              name="dimension2"
              class="form-control"
              placeholder="100"
            />
           
              <span className="text-muted"> <CloseIcon style={{fontSize:'13px'}} /></span>
             <input
              type="text"
              onChange={onchange}
              value={addArt.dimension3}
              className={`form-control ${errors.dimension3 && "is-invalid"}`}
              name="dimension3"
              class="form-control"
              placeholder="10"
            />
          
             </div> 
        </div>
        <div className="col">
                <label htmlFor="" className="fs-5" style={{color:"rgb(116, 168, 176)"}}>Material</label>
  
        <select class="form-control mt-1" id="exampleFormControlSelect1"
    value={addArt.material}
    onChange={onchange}
    name="material"
    style={{fontWeight:'700',color:'rgb(116, 168, 176)'}}
    >
    {
        Materials?.map((mat,i)=>{
          
            return (
                <option key={i} value={mat}>{mat}</option>
            )
        })
      }
      </select>
        </div>
            </div>

            <div className="row mt-3">
           <div className="col-md-6">
        <select class="form-control" id="exampleFormControlSelect1"
    value={addArt.measurments}
    onChange={onchange}
    name="measurments"
    style={{fontWeight:'700',color:'rgb(116, 168, 176)'}}
    >
    {
        Dimensions?.map((dim,i)=>{
          
            return (
                <option  key={i} value={dim}>{dim}</option>
            )
        })
      }
      </select>
      
        </div>
            </div>
            <div className="row mt-3">
           <div className="col-md-12">
           <input
              type="text"
              onChange={onchange}
              value={addArt.tags}
              className={`form-control ${errors.tags && "is-invalid"}`}
              name="tags"
              class="form-control"
              placeholder="#Cat #Popat #art #printing"
            />
              {errors.tags && (
              <div className="invalid-feedback">{errors.tags}</div>
            )}
        </div>
            </div>

        </div>

        <div className="col-md-6 col-sm-12 mt-4 ">
          <div className="d-flex justify-content-center align-items-center h-100">
                  
                      <img
                        src={selectedFile ?
            
                          URL.createObjectURL(selectedFile):
                          ''}
                        className=" img-fluid  "
                        style={{ width: '300px',height:'300px', position: 'relative' }}
                        alt="Avatar"
                      />
                     

                   
             
          </div>
         
        </div>
         <div className="d-flex justify-content-end text-end mt-3 border-top">
        <div className=" pt-2">
          <button
            className="btn text-white px-4"
            // onClick={addArtUser}
            onClick={next}
            style={{ backgroundColor: "#74A8B0",textTransform:'uppercase' ,letterSpacing:'0.5px' }}
          >
            Next
          </button>
        </div>
      </div>
      </div>
    
     
      ) : processing === 2 ?
      (
        <UserUloadArtVisibility 
        addArt={addArt}
        close={close}
        />
      ) : ''
    }
      
     
    </>
  );
};

export default UserUploadArtDetail;
