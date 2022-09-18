import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  isLoading: false,
  error: false,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    // GET USER START
    userListStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    userListSuccess: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
    },
    userListFail: (state) => {
      state.error = true;
    },
    // DELETE PRODUCT
    DeleteUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    DeleteUserSuccess: (state, action) => {
      state.isLoading = false;
      state.userList.splice(
        state.userList.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    DeleteUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    outer: (state) => {
      state.userList = [];
    },
  },
});

export const {
  userListStart,
  userListSuccess,
  userListFail,
  outer,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure,
} = userListSlice.actions;

export default userListSlice.reducer;
