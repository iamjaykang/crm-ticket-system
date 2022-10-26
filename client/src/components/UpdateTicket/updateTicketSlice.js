import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  replyTicketError: "",
  replyMsg: "",
};

const updateTicketSlice = createSlice({
  name: "updateTicket",
  initialState,
  reducers: {
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.replyTicketError = "";
      state.replyMsg = payload;
    },
    replyTicketFail: (state, { payload }) => {
      state.isLoading = true;
      state.replyTicketError = payload;
    },
    resetResponseMsg: (state) => {
      state.isLoading = false;
      state.replyMsg = '';
      state.replyTicketError = '';
    },
  },
});

const { reducer, actions } = updateTicketSlice;

export const {
  replyTicketFail,
  replyTicketLoading,
  replyTicketSuccess,
  resetResponseMsg
} = actions;

export default reducer;
