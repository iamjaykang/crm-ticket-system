import { getAllTickets } from "../../api/ticketApi";
import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
} from "./ticketsSlice";

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    //fetch data from API
    const result = await getAllTickets();

    console.log(result);

    dispatch(fetchTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSearchTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};
