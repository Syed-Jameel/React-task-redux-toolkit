import React from "react";
import Navbar from "./Navbar";
import Breadcrumb from "./Breadcrumb";

const Layout = ({ children }) => {
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
