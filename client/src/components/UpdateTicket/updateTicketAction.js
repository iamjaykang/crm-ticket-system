import { updateReplyTicket } from "../../api/ticketApi";
import { fetchUser } from "../../api/userApi";
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
    console.log(result);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message));
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(replyTicketSuccess(result.message));
  } catch (error) {
    console.log(error);
    dispatch(replyTicketFail(error.message));
  }
};
