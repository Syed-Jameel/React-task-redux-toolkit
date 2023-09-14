import React from "react";

const ButtonLoader = () => {
  return (
    <button className="btn btn-outline-dark btn-md  my-2 fw-bold" type="button" disabled>
      <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
      Loading...
    </button>
  );
};

export default ButtonLoader;
