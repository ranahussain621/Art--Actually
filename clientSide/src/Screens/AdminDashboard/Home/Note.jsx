import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThankYouNote,getAllArts,getAllSound } from "../../../redux/features/auth/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const UploadArtDetail = (props) => {

  

  const User = JSON.parse(localStorage.getItem("user"));
  const user_id = User?.user[0]._id;

  const [note, setNote] = useState({
    title: "",
    description: "",
    owner_id: user_id,
  });

  

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      title: "",
      description: "",
    };

    if (note.title.trim() === "") {
      updatedErrors.title = "Heading is required";
      isValid = false;
    }

    if (note.description.trim() === "") {
      updatedErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const Thanks = async () => {

    if (!validateForm()) {
      return;
    }

   await dispatch(ThankYouNote(note))
      .then(async () => {
        
        toast.success("Note submitted",{
          autoClose:1000
        })

        props.close()
        await dispatch(getAllArts())
        await dispatch(getAllSound())
        
       
      })
    
  };

  return (
    <>
      <div
        className="detail-title mt-3 d-flex align-items-center container"
        style={{ borderBottom: "1px solid grey" }}
      >
        <h3 className="my-3 w-100" style={{fontWeight:'400',letterSpacing:"0.9",color:'#709AA4', fontSize:"30px"}}>Thank You Note</h3>
        <span>
        <div style={{ height:"33px" , width:"33px", border:"1px solid  #709AA4", padding:"2px", borderRadius:"5px", textAlign:"center"}}>
          <FontAwesomeIcon
            icon={faXmark}
            className="fs-3"
            onClick={props.close}
            style={{color:"#709AA4"}}
          />
          </div>
        </span>
      </div>
      <div className="card-body" style={{ padding: "50px 85px" }}>
        <div className="form-group my-2">
          <p
            className="fw-semibold h4"
            style={{
              color: "#74A8B0",
            }}
          >
            Heading
          </p>
          <input
            type="text"
            onChange={onChange}
            value={note.title}
            className={`text-muted form-control ${
              errors.title && "is-invalid"
            }`}
            name="title"
            class="form-control"
            style={{border:"1px solid #CACED8"}}
            placeholder="Thank you for Buying"
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="form-group my-3">
          <p
            className="fw-semibold h4"
            style={{
              color: "#74A8B0",
            }}
          >
            Description
          </p>
          <textarea
            className={`text-muted form-control ${
              errors.description && "is-invalid"
            }`}
            onChange={onChange}
            value={note.description}
            style={{border:"1px solid #CACED8"}}
            name="description"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam sunt, quibusdam facilis consequuntur amet  "
            rows="6"
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="d-flex justify-content-end  text-end my-3">
          <div className=" pt-2">
            <button
              className="btn text-white"
              onClick={Thanks}
              style={{ backgroundColor: "#74A8B0" , borderRadius:"10px"}}
            >
              Send Notes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadArtDetail;
