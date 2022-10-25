import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  replyMsg: '',
};

const updateTicketSlice = createSlice({
  name: "updateTicket",
  initialState,
  reducers: {
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, {payload}) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = payload;
    },
    replyTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = updateTicketSlice;

export const { replyTicketFail, replyTicketLoading, replyTicketSuccess } =
  actions;

export default reducer;
