import { createNewTicket } from "../../api/ticketApi";
import { fetchAllTickets } from "../../pages/TicketList/ticketsAction";
import {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
} from "./newTicketSlice";

export const openNewTicket = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(openNewTicketPending());

      const result = await createNewTicket(formData);
      
      if (result.status === "error") {
        return dispatch(openNewTicketFail());
      }
      dispatch(fetchAllTickets());
      dispatch(openNewTicketSuccess(result.message));
    } catch (error) {
      console.log(error);
      dispatch(openNewTicketFail(error.message));
    }
  });
};
