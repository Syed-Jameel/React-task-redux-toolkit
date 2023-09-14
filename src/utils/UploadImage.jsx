import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";

const UploadImage = ({ setBase64Image }) => {
  const [imagePreview, setImagePreview] = useState("");
  const id = useId();
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const validateImage = (file) => {
    if (!file) {
      setError("profileImage", { type: "required", message: "image is required!" });
      return false;
    } else if (file.size > 1024 * 1024) {
      // 1MB
      setError("profileImage", { type: "maxSize", message: "image must be less than 1MB" });
      return false;
    } else {
      clearErrors("profileImage");
      return true;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (validateImage(file)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setImagePreview(base64);
        setBase64Image(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="form-label" htmlFor={`${id}-profileImage`}>
        Upload Image
      </label>
      <div className="input-group">
        <input type="file" id={`${id}-profileImage`} accept="image/*" onChange={handleImageChange} className="bg-transparent text-dark form-control form-control-md" />
        {imagePreview && (
          <span className="input-group-text p-0">
            <img src={imagePreview} alt="Preview" style={{ maxWidth: "20px" }} />
          </span>
        )}
      </div>
      {errors.profileImage ? (
        <span role="alert" className="text-danger">
          {errors.profileImage.message}
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
};

export default UploadImage;
