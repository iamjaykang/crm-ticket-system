import { deleteTicket } from "../../api/ticketApi";
import { fetchAllTickets } from "../../pages/TicketList/ticketsAction";
import {
  deleteTicketPending,
  deleteTicketSuccess,
  deleteTicketFail,
} from "./ticketTableSlice";

export const removeTicket = (_id) => async (dispatch) => {
  dispatch(deleteTicketPending());
  try {
    const result = await deleteTicket(_id);
    if (result.status === "error") {
      return dispatch(deleteTicketFail(result.message));
    }
    dispatch(deleteTicketSuccess(result.message));
    dispatch(fetchAllTickets());
  } catch (error) {
    dispatch(deleteTicketFail(error.message));
  }
};
