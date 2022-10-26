import { createNewTicket } from "../../api/ticketApi";
import {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
  resetSuccessMsg
} from "./newTicketSlice";

export const openNewTicket = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(openNewTicketPending());

      const result = await createNewTicket(formData);
      if (result.status === "error") {
        return dispatch(openNewTicketFail());
      }
      dispatch(openNewTicketSuccess(result.message));
    } catch (error) {
      console.log(error);
      dispatch(openNewTicketFail(error.message));
    }
  });
};
