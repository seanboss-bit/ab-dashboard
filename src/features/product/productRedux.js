import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // GET PRODUCTS
    ProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    ProductSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    ProductFailure: (state) => {
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
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    DeleteFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // UPDATE PRODUCT
    UpadateStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    UpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    UpdateFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // UPDATE PRODUCT
    AddStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    AddSuccess: (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload)
    },
    AddFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  ProductStart,
  ProductSuccess,
  ProductFailure,
  DeleteStart,
  DeleteSuccess,
  DeleteFailure,
  UpadateStart,
  UpdateSuccess,
  UpdateFailure,
  AddStart,
  AddSuccess,
  AddFailure,
} = productSlice.actions;
export default productSlice.reducer;
