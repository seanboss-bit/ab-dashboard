import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
  isLoading: false,
  error: false,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // GET PRODUCTS
    MessageStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    MessageSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    MessageFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // DELETE PRODUCT
    DeleteStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    DeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.message.splice(
        state.message.findIndex((item) => action.payload.id === item._id),
        1
      );
    },
    DeleteFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    messageOut: (state) => {
      state.message = [];
    },
  },
});

export const {
  MessageStart,
  MessageSuccess,
  MessageFailure,
  DeleteStart,
  DeleteSuccess,
  DeleteFailure,
  messageOut
} = messageSlice.actions;

export default messageSlice.reducer;
