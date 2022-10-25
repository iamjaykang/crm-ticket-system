import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
};

const updateTicketListSlice = createSlice({
  name: "updateTicket",
  initialState,
  reducers: {
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    replyTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = updateTicketListSlice;

export const { replyTicketFail, replyTicketLoading, replyTicketSuccess } =
  actions;

export default reducer;
