import { updateReplyTicket } from "../../api/ticketApi";
import { fetchSingleTicket } from "../../pages/TicketList/ticketsAction";
import {
  replyTicketLoading,
  replyTicketFail,
  replyTicketSuccess,
} from "./updateTicketSlice";

export const replyOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());
  try {
    const result = await updateReplyTicket(_id, msgObj);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(replyTicketSuccess(result.message));
  } catch (error) {
    dispatch(replyTicketFail(error.message));
  }
};
