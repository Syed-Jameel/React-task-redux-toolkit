import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const Auth = localStorage.getItem("user");
  const user = JSON.parse(Auth);

  const handleLogout = () => {
    toast.success(`👍logged out successfully!`);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark shadow shadow-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" replace={true}>
          <img src={logo} alt="logo" width={70} height={40} className="d-inline-block align-text-center" />
        </Link>
        <div>
          <span className="text-white fw-bolder mx-2">{user?.username}</span>
          <button className="btn btn-outline-light fw-bold ms-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
