import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "./postAPI";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  post: null,
  status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

export const fetchAllPostsAsync = createAsyncThunk("post/fetchAllPosts", async () => {
  try {
    const response = await fetchAllPosts();
    // The value we return becomes the `fulfilled` action payload
    return response.data.post;
  } catch (error) {
    console.log("something went wrong in fetchAllPostsAsync", error);
  }
});

export const fetchPostAsync = createAsyncThunk("post/fetchPost", async (id) => {
  try {
    const response = await fetchPost(id);
    return response.data.post;
  } catch (error) {
    console.log("something went wrong in fetchPostAsync", error);
  }
});

export const createPostAsync = createAsyncThunk("post/createPost", async (post) => {
  try {
    const response = await createPost(post);
    return response.data;
  } catch (error) {
    console.log("something went wrong in createPostAsync", error);
  }
});

export const updatePostAsync = createAsyncThunk("post/updatePost", async ({ post, id }) => {
  try {
    const response = await updatePost(post, id);
    return response.data;
  } catch (error) {
    console.log("something went wrong in updatePostAsync", error);
  }
});

export const deletePostAsync = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const response = await deletePost(id);
    return response.data;
  } catch (error) {
    console.log("something went wrong in deletePostAsync", error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPostsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
        toast.success("post added successfully👍");
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
        toast.info("post updated successfully👍");
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex((post) => post._id === action.payload.id);
        state.posts.splice(index, 1);
        toast.success("post deleted successfully👍");
      })
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPost = (state) => state.post.post;
export const selectStatus = (state) => state.post.status;
export const selectError = (state) => state.post.error;

export default postSlice.reducer;
