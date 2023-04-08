/* 
This file was made as a demonstration for connecting your application store, 
asynchronous calls, and reducers via Redux Toolkit.
It utilizing "slices" and "thunks" to hydrate application state.

The remaining files in the store will utilize Redux Toolkit Query and its "API"
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import axios from "axios";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  // reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // createUser
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // deleteUser
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await axios.get("http://localhost:3005/users");

  // DEV ONLY!!!
  await pause(1500);

  return res.data;
});

export const createUser = createAsyncThunk("users/create", async () => {
  const res = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(),
  });

  // DEV ONLY!!!
  await pause(1500);

  return res.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`http://localhost:3005/users/${id}`);

  // DEV ONLY!!!
  await pause(1500);

  return id;
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
