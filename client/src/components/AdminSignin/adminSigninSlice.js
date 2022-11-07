import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAdmin: false,
  error: "",
};

const adminSigninSlice = createSlice({
  name: "adminSignin",
  initialState,
  reducers: {
    adminSigninPending: (state, action) => {
      state.isLoading = true;
    },
    adminSigninSuccess: (state, action) => {
      state.isLoading = false;
      state.isAdmin = true;
      state.error = "";
    },
    adminSigninFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetAdminSigninStatus: (state) => {
      state.isLoading = false;
      state.isAdmin = false;
    },
  },
});

const { reducer, actions } = adminSigninSlice;

export const {
  adminSigninPending,
  adminSigninSuccess,
  adminSigninFail,
  resetAdminSigninStatus,
} = actions;

export default reducer;
