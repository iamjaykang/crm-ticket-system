import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};

const userVerificationSlice = createSlice({
  name: "userVerification",
  initialState,
  reducers: {
    verificationPending: (state) => {
      state.isLoading = true;
    },
    verificationSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload;
    },
    verificationFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload;
    },
  },
});

const { reducer, actions } = userVerificationSlice;

export const { verificationFail, verificationPending, verificationSuccess } = actions;

export default reducer;
