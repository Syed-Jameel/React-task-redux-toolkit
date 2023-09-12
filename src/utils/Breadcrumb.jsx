import React from "react";
import { NavLink } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const params = useParams();
  const location = useLocation();
  const currentRoute = location.pathname;
  const style = {
    padding: `${currentRoute === `/` || currentRoute === `/post/${params.id}` ? "0.5rem 0rem" : "1rem 0rem"}`,
  };

  return (
    <div className="container-fluid bg-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="breadcrumb  d-flex justify-content-between align-items-center" style={style}>
              <div className="d-flex justify-content-between align-items-center">
                <li className="breadcrumb-item">
                  <NavLink to="/" activeclassname="active">
                    Home
                  </NavLink>
                </li>

                {!params.id && (
                  <li className="breadcrumb-item">
                    <NavLink to="/post/add" activeclassname="active">
                      AddPost
                    </NavLink>
                  </li>
                )}

                {currentRoute === `/post/${params.id}` && (
                  <li className="breadcrumb-item ">
                    <NavLink to={`/post/${params.id}`} activeclassname="active">
                      Post
                    </NavLink>
                  </li>
                )}

                {currentRoute === `/post/edit/${params.id}` && (
                  <li className="breadcrumb-item ">
                    <NavLink to={`/post/edit/${params.id}`} activeclassname="active">
                      EditPost
                    </NavLink>
                  </li>
                )}
              </div>

              {(currentRoute === `/` || currentRoute === `/post/${params.id}`) && (
                <NavLink to="/post/add" replace={true}>
                  <i className="bi bi-plus-circle-fill text-dark add-btn" style={{ fontSize: "30px" }} title="add post"></i>
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
