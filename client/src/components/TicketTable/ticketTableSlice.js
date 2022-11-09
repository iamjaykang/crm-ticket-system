import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleteLoading: false,
  deleteTicketMsg: "",
  status: ""
};

const deleteTicketSlice = createSlice({
  name: "deleteTicket",
  initialState,
  reducers: {
    deleteTicketPending: (state) => {
      state.isDeleteLoading = true;
    },
    deleteTicketSuccess: (state, {payload}) => {
      state.isDeleteLoading = false;
      state.status = "success";
      state.deleteTicketMsg = payload;
    },
    deleteTicketFail: (state, {payload}) => {
      state.isDeleteLoading = true;
      state.status = "error";
      state.deleteTicketMsg = payload;
    },
  },
});

const { reducer, actions } = deleteTicketSlice;

export const { deleteTicketPending, deleteTicketSuccess, deleteTicketFail } =
  actions;

export default reducer;
