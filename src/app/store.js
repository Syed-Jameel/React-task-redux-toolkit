import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
