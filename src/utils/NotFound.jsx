import React from "react";
import notFound from "../assets/images/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container-fluid gradient-custom">
      <div className="container">
        <div className="row d-flex justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-auto">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img src={notFound} className="img-fluid" width="100%" />
              <Link to="/" className="btn btn-outline-dark px-3 mt-4 w-50 d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-left fw-bolder large-icon"></i>
                <span className="mr-2 fw-bold"> Go Back</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
