import React, { useId, useState } from "react";
import { validationSchema } from "../../../utils/validation";
import CustomInputField from "../../../utils/CustomInputField";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserAsync, selectStatus } from "../authSlice";
import { useSelector } from "react-redux";
import UploadImage from "../../../utils/UploadImage";
import ButtonLoader from "../../../utils/ButtonLoader";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [base64Image, setBase64Image] = useState("");

  const id = useId();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword"); // Get the password value from the form
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const onSubmit = (userData) => {
    const modifiedUserData = { ...userData, profileImage: base64Image };
    console.log(modifiedUserData);
    delete modifiedUserData.confirmPassword;
    console.log(modifiedUserData);
    dispatch(createUserAsync(modifiedUserData))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <section className="container-fluid login-back-img">
        <div className="container">
          <div className="row d-flex justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="col-12 col-lg-8 my-auto">
              <div className="card card-color shadow shadow-md text-dark card-border" style={{ borderRadius: "1rem" }}>
                <div className="card-body py-3 px-4 px-sm-5 text-center">
                  <div className="mb-md-2 mt-md-2">
                    <h2 className="fw-bold mb-2 text-uppercase custom-color">Signup</h2>
                    <p className="text-dark-50 mb-5 ">Please enter your details!</p>
                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="text-start">
                      <div className="row ">
                        <div className="col-12 col-sm-6 ">
                          <CustomInputField id={id + "-fullName"} label="Full Name" name="fullName" validationSchema={validationSchema.fullName} register={register} errors={errors.fullName} placeholder="Enter your fullName" />
                        </div>
                        <div className="col-12 col-sm-6 ">
                          <CustomInputField id={id + "-email"} label="Email" name="email" validationSchema={validationSchema.email} register={register} errors={errors.email} placeholder="Enter your email" />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-12 col-sm-6 ">
                          <CustomInputField id={id + "-phone"} label="Phone" name="phone" validationSchema={validationSchema.phone} register={register} errors={errors.phone} placeholder="Enter your phone no" />
                        </div>
                        <div className="col-12 col-sm-6 ">
                          <UploadImage setBase64Image={setBase64Image} />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-12 col-sm-6 ">
                          <div>
                            <label className="form-label" htmlFor={id + "-password"}>
                              Password
                            </label>
                            <div className="input-group">
                              <input
                                {...register("password", validationSchema.password)} // Use the validation schema here
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                id={id + "-password"}
                                className="bg-transparent text-dark form-control form-control-md"
                              />
                              {password && (
                                <span className="input-group-text">
                                  <i className={`bi ${passwordVisible ? "bi-eye-slash-fill" : "bi-eye-fill"}`} onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}></i>
                                </span>
                              )}
                            </div>
                            {errors.password ? (
                              <span role="alert" className="text-danger">
                                {errors.password.message}
                              </span>
                            ) : (
                              <span>&nbsp;</span>
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 ">
                          <div>
                            <label className="form-label" htmlFor={id + "-confirmPassword"}>
                              Confirm Password
                            </label>
                            <div className="input-group">
                              <input
                                {...register("confirmPassword", {
                                  required: "Confirm Password is required",
                                  validate: (value) => {
                                    return value === password || "Passwords do not match";
                                  },
                                })}
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Enter your confirm-password"
                                id={id + "-confirmPassword"}
                                className="bg-transparent text-dark form-control form-control-md"
                              />
                              {confirmPassword && (
                                <span className="input-group-text">
                                  <i className={`bi ${confirmPasswordVisible ? "bi-eye-slash-fill" : "bi-eye-fill"}`} onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }}></i>
                                </span>
                              )}
                            </div>
                            {errors.confirmPassword ? (
                              <span role="alert" className="text-danger">
                                {errors.confirmPassword.message}
                              </span>
                            ) : (
                              <span>&nbsp;</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        {status === "loading" ? (
                          <ButtonLoader />
                        ) : (
                          <button className="btn btn-outline-dark btn-md px-5 my-2 fw-bold" type="submit">
                            Signup
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">
                      Already have an account?
                      <Link to="/login" replace={true} className="text-decoration-none text-dark ps-1 fw-bold custom-link">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
