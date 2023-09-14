import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
import { selectUserData } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      // Clearing the localStorage
      localStorage.clear();

      // Checking if user data is present
      const user = localStorage.getItem("user");

      if (!user) {
        toast.warn("Your session has expired❗");
        navigate("/login");
      }
    }, 3600000);

    // Clearing the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [navigate]);

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
          <div className="dropdown">
            <div className="d-flex align-items-center rounded rounded-circle " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" width="50" height="50" className="avatar rounded-circle" />
              <i className="bi bi-chevron-double-down text-white ms-2"></i>
            </div>
            <div className="dropdown-menu dropdown-menu-end shadow shadow-md" aria-labelledby="dropdownMenuButton">
              <span className="dropdown-item user-name">
                <i className="bi bi-person text-light"></i> {userData?.fullName}
              </span>
              <Link className="dropdown-item " to="/profile">
                <i className="bi bi-person-lines-fill text-dark"></i> Profile
              </Link>
              <span className="dropdown-item " onClick={handleLogout}>
                <i className="bi bi-box-arrow-left text-dark"></i> Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
