export const validationSchema = {
  username: {
    required: "username is required!",
    minLength: { value: 5, message: "username must be at least 5 characters long!" },
    maxLength: { value: 20, message: "username cannot exceed 20 characters!" },
  },
  password: {
    required: "password is required!",
    // pattern: {
    //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    //   message: `at least 8 characters,
    //             1 uppercase letter, 1 lowercase letter, and 1 number
    //             and can contain special characters`,
    // },
  },
  fullName: {
    required: "full name is required!",
    minLength: { value: 5, message: "full name must be at least 5 characters long!" },
    maxLength: { value: 20, message: "full name cannot exceed 20 characters!" },
  },
  email: {
    required: "email is required!",
    pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "invalid email address!" },
  },
  phone: {
    required: "phone number is required!",
    pattern: { value: /^[0-9]{10}$/, message: "invalid phone number!" },
  },
  gender: {
    required: "select gender!",
  },
  postTitle: {
    required: "post title is required!",
    // minLength: { value: 10, message: "post title must be at least 10 characters long!" },
    // maxLength: { value: 40, message: "post title cannot exceed 40 characters!" },
  },
  postDescription: {
    required: "post description is required!",
    // minLength: { value: 30, message: "post description must be at least 30 characters long!" },
    // maxLength: { value: 100, message: "post description cannot exceed 100 characters!" },
  },
};
