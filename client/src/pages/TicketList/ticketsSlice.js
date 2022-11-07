import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
  searchTicketList: [],
  selectedTicket: {},
  statusReplyMsg: "",
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, {payload}) => {
      state.tickets = payload;
      state.searchTicketList = payload;
      state.isLoading = false;
    },
    fetchTicketFail: (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchTickets: (state, {payload}) => {
      state.searchTicketList = state.tickets.filter((row) => {
        if (!payload) return row;

        return row.subject.toLowerCase().includes(payload.toLowerCase());
      });
    },
    fetchSingleTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, { payload }) => {
      state.selectedTicket = payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    closeTicketLoading: (state) => {
      state.isLoading = true;
    },
    closeTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.statusReplyMsg = payload;
    },
    closeTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetStatusReplyMsg: (state) => {
      state.isLoading = false;
      state.statusReplyMsg = '';
    },
    resetFetchTicket: (state) => {
      state.isLoading = false;
      state.tickets = [];
    }
  },
});

const { reducer, actions } = ticketListSlice;

export const {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  closeTicketFail,
  closeTicketLoading,
  closeTicketSuccess,
  resetStatusReplyMsg,
  resetFetchTicket
} = actions;

export default reducer;
