import React from "react";

const Spinner = () => {
  return (
    <div className="loader-container">
      <div className="spinner-border loader">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
