import React, { useEffect, useId, useState } from "react";
import { validationSchema } from "../../../utils/validation";
import CustomInputField from "../../../utils/CustomInputField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const id = useId();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const password = watch("password"); // Get the password value from the form
  const navigate = useNavigate();

  const Auth = localStorage.getItem("user");
  useEffect(() => {
    if (Auth) {
      navigate("/");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (user) => {
    const username = user.username.trim();
    const password = user.password.trim();

    if (username === "admin" && password === "Admin@123") {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      toast.success("👍login successfully!");
    } else {
      toast.error("invalid credential❗");
    }
  };

  return (
    <section className="container-fluid login-back-img">
      <div className="container">
        <div className="row d-flex justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-auto">
            <div className="card card-color shadow shadow-md text-dark card-border" style={{ borderRadius: "1rem" }}>
              <div className="card-body py-3 px-4 px-sm-5 text-center">
                <div className="mb-md-5 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-dark-50 mb-5 ">Please enter your email and password!</p>
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <CustomInputField id={id + "-username"} label="Username" name="username" validationSchema={validationSchema.username} register={register} errors={errors.username} placeholder="Enter your username" />
                    <div className="mb-4">
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
                    <p className="small mb-4 pb-lg-2">
                      <a className="text-dark" href="#">
                        Forgot password?
                      </a>
                    </p>
                    <button className="btn btn-outline-dark btn-md px-5 fw-bold" type="submit">
                      Login
                    </button>
                  </form>
                  <div className="d-flex justify-content-center text-center my-3">
                    <a href="https://www.facebook.com/" target="_blank" className="text-dark">
                      <i className="bi bi-facebook large-icon"></i>
                    </a>
                    <a href="https://twitter.com/" target="_blank" className="text-dark">
                      <i className="bi bi-twitter large-icon mx-4 px-2"></i>
                    </a>
                    <a href="https://www.google.com/" target="_blank" className="text-dark">
                      <i className="bi bi-google large-icon"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-0">
                    Don't have an account?
                    <a href="#" className="text-dark ps-1 fw-semibold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
