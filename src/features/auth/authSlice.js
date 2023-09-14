import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, fetchUserDataById } from "./authAPI";
import { toast } from "react-toastify";

const initialState = {
  userData: null,
  user: null,
  status: "idle", // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

export const createUserAsync = createAsyncThunk("auth/createUser", async (user, { rejectWithValue }) => {
  try {
    const resposne = await createUser(user);
    return resposne;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const checkUserAsync = createAsyncThunk("auth/checkUser", async (loginData, { rejectWithValue }) => {
  try {
    const response = await checkUser(loginData);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchUserDataByIdAsync = createAsyncThunk("auth/fetchUserDataById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchUserDataById(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload.error) {
          state.user = action.payload.data;
          toast.success("Signed in successfully👌");
        } else {
          state.error = action.payload.error;
          toast.warn("User Already axist❗");
        }
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload.error) {
          state.user = action.payload.data;
          toast.success("logged in successfully👌");
        } else {
          state.error = action.payload.error;
          toast.warn("user not found👌");
        }
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchUserDataByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload.result;
      })
      .addCase(fetchUserDataByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  },
});

export const selectUserData = (state) => state.auth.userData;
export const selectUser = (state) => state.auth.user;
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
