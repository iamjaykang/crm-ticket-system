import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    signinPending: (state, action) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    signinFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = signinSlice;

export const { signinPending, signinSuccess, signinFail } = actions;

export default reducer;
