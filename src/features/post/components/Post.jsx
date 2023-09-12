import React, { useEffect } from "react";
import Layout from "../../../utils/Layout";
import Spinner from "../../../utils/Spinner";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostAsync, selectPost, selectStatus } from "../postSlice";

const Post = () => {
  const post = useSelector(selectPost);
  const status = useSelector(selectStatus);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostAsync(params.id));
  }, [dispatch]);

  return (
    <Layout>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="row py-4 d-flex justify-content-center align-items-center">
          <div className="col-12  col-md-12 ">
            <div className="card card-color shadow shadow-md border-0" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div className="col-md-4 pb-3 profile-section text-center text-white custom-border-radius">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Avatar" className="img-fluid avatar my-4 rounded rounded-circle " style={{ width: 100 }} />

                  <h5>{post?.fullName}</h5>
                  <p className="text-secondary">Web Developer</p>
                  <div>
                    <i className="bi bi-pencil text-secondary large-icon" title="edit profile"></i>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h5>Information</h5>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-12 col-sm-4 mb-3">
                        <h6 className="d-inline d-sm-block">Email</h6>
                        <p className="text-muted d-inline d-sm-block ps-2 ps-sm-0">{post?.email}</p>
                      </div>
                      <div className="col-12 col-sm-4 mb-3">
                        <h6 className="d-inline d-sm-block">Phone</h6>
                        <p className="text-muted d-inline d-sm-block ps-2 ps-sm-0">{post?.phone}</p>
                      </div>
                      <div className="col-12 col-sm-4 mb-3">
                        <h6 className="d-inline d-sm-block">Gender</h6>
                        <p className="text-muted d-inline d-sm-block ps-2 ps-sm-0">{post?.gender}</p>
                      </div>
                    </div>
                    <h5>Post</h5>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-12 mb-3">
                        <h6>{post?.postTitle}</h6>
                        <p className="text-secondary">{post?.postDescription}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <a href="https://www.facebook.com/" target="_blank">
                          <i className="bi bi-facebook large-icon me-3" />
                        </a>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="bi bi-twitter large-icon me-3" />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank">
                          <i className="bi bi-instagram large-icon" />
                        </a>
                      </div>

                      <div>
                        <Link to={`/post/edit/${params?.id}`} replace={true}>
                          <i className="bi bi-pencil-square text-warning large-icon" title="edit post"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Post;
