import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    resetRequestPending: (state) => {
      state.isLoading = true;
    },
    resetRequestSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload;
    },
    resetRequestFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload;
    },
    updateRequestPending: (state) => {
      state.isLoading = true;
    },
    updateRequestSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload;
    },
    updateRequestFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload;
    },
  },
});

const { reducer, actions } = passwordResetSlice;

export const {
  resetRequestFail,
  resetRequestPending,
  resetRequestSuccess,
  updateRequestPending,
  updateRequestSuccess,
  updateRequestFail,
} = actions;

export default reducer;
