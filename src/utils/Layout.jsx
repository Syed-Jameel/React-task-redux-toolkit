import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";
import { fetchUserDataByIdAsync } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const { userId } = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDataByIdAsync(userId));
  }, [dispatch]);

  return (
    <div>
      <header>
        <div className="position-fixed top-0 start-0 end-0 z-1">
          <Navbar />
          <Breadcrumb />
        </div>
      </header>

      <section className="container-fluid gradient-custom">
        <div className="container">{children}</div>
      </section>
    </div>
  );
};

export default Layout;
