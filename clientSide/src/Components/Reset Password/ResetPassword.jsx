import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/images/cardImage9.png";
import { useDispatch } from "react-redux";
import { ChangePassowrd } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const NewPassword = () => {
  const param = useParams();
  var user_id = param.id;

  const dispatch = useDispatch();

  const [data, setData] = useState({
    newpassword: "",
    confirmpassword: "",
    id: user_id,
  });

  const [errors, setErrors] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!data.newpassword) {
      newErrors.newpassword = "New Password is required";
      isValid = false;
    }

    if (!data.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required";
      isValid = false;
    }

    if (data.newpassword !== data.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submit = async () => {
    if (validateForm()) {
      await dispatch(ChangePassowrd(data)).then(() => {
        toast.success("Password Changed Successfully", {
          autoClose: 1000,
        });
        setData({
          newpassword: "",
          confirmpassword: "",
        });
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card text-black m-5 rounded-5">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-12 order-lg-2 d-flex flex-column align-items-center">
            <div className="mt-md-5 mt-lg-5 mt-sm-4 xs-my-5">
              <div className="m-0 text-start my-md-3">
                <h2
                  className="fw-bold my-md-3"
                  style={{
                    color: "rgb(112, 155, 165)",
                    fontFamily: "var(--bs-body-font-family)",
                  }}
                >
                  New Password
                </h2>
              </div>
              <p
                className="mb-3  ms-0 mx-1 mt-1"
                style={{
                  color: "rgb(112, 155, 165)",
                  fontFamily: "var(--bs-body-font-family)",
                }}
              >
                Please enter the new password for your account.
              </p>

              <div className="d-flex flex-row align-items-center mb-3">
                <div className="mb-3">
                  <label
                    htmlFor="newPassword"
                    className="form-label fw-bold mb-2"
                    style={{
                      color: "rgb(112, 155, 165)",
                      fontFamily: "var(--bs-body-font-family)",
                    }}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-0"
                    id="newPassword"
                    value={data.newpassword}
                    onChange={(e) =>
                      setData({ ...data, newpassword: e.target.value })
                    }
                  />
                  {errors.newpassword && (
                    <p className="error text-danger">{errors.newpassword}</p>
                  )}
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mb-2">
                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-bold mb-2"
                    style={{
                      color: "rgb(112, 155, 165)",
                      fontFamily: "var(--bs-body-font-family)",
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-0"
                    id="confirmPassword"
                    value={data.confirmpassword}
                    onChange={(e) =>
                      setData({ ...data, confirmpassword: e.target.value })
                    }
                  />
                  {errors.confirmpassword && (
                    <p className="error text-danger">
                      {errors.confirmpassword}
                    </p>
                  )}
                </div>
              </div>

              <button
                className="btn mb-4 text-white px-4"
                size="lg"
                onClick={submit}
                style={{ background: "rgb(112, 154, 164)" }}
              >
                Save
              </button>
              <div className="text-center">
                <p className="w-100">
                  {" "}
                  <Link to="/">Sign in?</Link>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-10 ps-sm-5 pb-sm-3 my-lg-5 mt-md-5 pe-md-5 ps-lg-5">
            <img
              src={img}
              className=" img-fluid bg-0"
              alt="No Data"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
