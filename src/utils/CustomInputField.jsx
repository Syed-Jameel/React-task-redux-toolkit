import React, { memo } from "react";

const CustomInputField = ({ id, label, name, type, validationSchema, errors, register, placeholder, defaultValue }) => {
  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input {...register(name, validationSchema)} aria-invalid={errors ? "true" : "false"} type={type} placeholder={placeholder} id={id} defaultValue={defaultValue} className="bg-transparent text-dark form-control form-control-md" />
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

export default memo(CustomInputField);
