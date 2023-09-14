import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/components/Login";
import Signup from "../features/auth/components/Signup";
import PostsList from "../features/post/components/PostsList";
import Post from "../features/post/components/Post";
import AddUpdatePost from "../features/post/components/AddUpdatePost";
import NotFound from "../utils/NotFound";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import Profile from "../features/auth/components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PostsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/post/:id",
    element: (
      <ProtectedRoute>
        <Post />
      </ProtectedRoute>
    ),
  },

  {
    path: "/post/add",
    element: (
      <ProtectedRoute>
        <AddUpdatePost />
      </ProtectedRoute>
    ),
  },

  {
    path: "/post/edit/:id",
    element: (
      <ProtectedRoute>
        <AddUpdatePost />
      </ProtectedRoute>
    ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
