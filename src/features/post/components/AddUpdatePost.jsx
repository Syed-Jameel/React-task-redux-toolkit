import React, { useEffect, useId } from "react";
import Layout from "../../../utils/Layout";
import Spinner from "../../../utils/Spinner";
import CustomInputField from "../../../utils/CustomInputField";
import { validationSchema } from "../../../utils/validation";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createPostAsync, fetchPostAsync, selectPost, updatePostAsync, selectStatus } from "../postSlice";

const AddUpdatePost = () => {
  const id = useId();
  const params = useParams();
  const paramsId = Boolean(params.id);
  const post = useSelector(selectPost);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (paramsId) {
      dispatch(fetchPostAsync(params.id));
    }
  }, [dispatch]);

  // Use local storage to persist form data
  useEffect(() => {
    if (paramsId && post) {
      setValue("fullName", post.fullName);
      setValue("email", post.email);
      setValue("phone", post.phone);
      setValue("gender", post.gender);
      setValue("postTitle", post.postTitle);
      setValue("postDescription", post.postDescription);
    }
  }, [paramsId, post, setValue]);

  const onSubmit = (post) => {
    if (paramsId) {
      dispatch(updatePostAsync({ post, id: params.id }))
        .then(() => {
          navigate(`/post/${params.id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(createPostAsync(post))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Layout>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="row py-4 d-flex justify-content-center align-items-center">
          <div className="col-12  col-md-10 ">
            <div className="card card-color shadow shadow-lg text-dark card-border" style={{ borderRadius: "1rem" }}>
              <div className="card-body px-4 px-sm-5 text-center">
                <div className="mb-md-4 mt-md-4">
                  <h4 className="fw-bold mb-2 text-uppercase">{paramsId ? "Edit Post" : "Add Post"}</h4>
                  <p className="text-dark-50 mb-5">Please {paramsId ? "update" : "enter"} details!</p>
                  <form noValidate onSubmit={handleSubmit(onSubmit)} className="text-start">
                    <div className="row ">
                      <div className="col-12 col-sm-6 ">
                        <CustomInputField id={id + "-fullName"} label="Full Name" type="text" name="fullName" validationSchema={validationSchema.fullName} register={register} errors={errors.fullName} placeholder="Enter your fullName" />
                      </div>

                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-email"} label="Email" type="text" name="email" validationSchema={validationSchema.email} register={register} errors={errors.email} placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-phone"} label="Phone" type="text" name="phone" validationSchema={validationSchema.phone} register={register} errors={errors.phone} placeholder="Enter your phone no" />
                      </div>
                      <div className="col-12 col-sm-6">
                        <label className="form-label" htmlFor={id + "-gender"}>
                          Gender
                        </label>
                        <select
                          className="bg-transparent text-dark form-select"
                          {...register("gender", validationSchema.gender)}
                          onChange={(e) => {
                            setPost({ ...post, gender: e.target.value });
                          }}>
                          <option value="" disabled>
                            --select gender--
                          </option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </select>
                        {errors.gender ? (
                          <span role="alert" className="text-danger">
                            {errors.gender.message}
                          </span>
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-postTitle"} label="Post Title" type="text" name="postTitle" validationSchema={validationSchema.postTitle} register={register} errors={errors.postTitle} placeholder="Enter Post Title" />
                      </div>
                      <div className="col-12 col-sm-6">
                        <CustomInputField id={id + "-postDescription"} label="Post Description" type="text" name="postDescription" validationSchema={validationSchema.postDescription} register={register} errors={errors.postDescription} placeholder="Enter Post Description" />
                      </div>
                    </div>

                    <div className="text-center">
                      <button className="btn btn-outline-dark btn-md px-5 fw-bold" type="submit">
                        {paramsId ? "Update" : "Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AddUpdatePost;
