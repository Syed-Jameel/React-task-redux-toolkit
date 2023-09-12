import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, fetchPost, createPost, updatePost, deletePost } from "./postAPI";

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
    return response.data;
  } catch (error) {
    console.log("something went wrong in fetchAllPostsAsync", error);
  }
});

export const fetchPostAsync = createAsyncThunk("post/fetchPost", async (id) => {
  try {
    const response = await fetchPost(id);
    return response.data;
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
    builder.addCase(fetchAllPostsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    });
    builder.addCase(fetchAllPostsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchPostAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.post = action.payload;
    });
    builder.addCase(fetchPostAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createPostAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPostAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.posts.push(action.payload);
    });
    builder.addCase(createPostAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updatePostAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updatePostAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.posts.findIndex((post) => post._id === action.payload.id);
      state.posts[index] = action.payload;
    });
    builder.addCase(updatePostAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deletePostAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deletePostAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.posts.findIndex((post) => post._id === action.payload.id);
      state.posts.splice(index, 1);
    });
    builder.addCase(deletePostAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPost = (state) => state.post.post;
export const selectStatus = (state) => state.post.status;

export default postSlice.reducer;
