import React from "react";

const CustomPasswordField = ({ label, id, name, validationSchema, passwordVisible, placeholder, formValueOfPassword, togglePasswordVisibility, register, errors }) => {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className="input-group">
        <input
          {...register(name, validationSchema)} // Use the validation schema here
          type={passwordVisible ? "text" : "password"}
          placeholder={placeholder}
          id={id}
          className="bg-transparent text-dark form-control form-control-md"
        />
        {formValueOfPassword && (
          <span className="input-group-text">
            <i className={`bi ${passwordVisible ? "bi-eye-slash-fill" : "bi-eye-fill"}`} onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}></i>
          </span>
        )}
      </div>
      {errors ? (
        <span role="alert" className="text-danger">
          {errors.message}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
};

export default CustomPasswordField;
