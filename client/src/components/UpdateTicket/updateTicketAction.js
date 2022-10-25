import { updateReplyTicket } from "../../api/ticketApi";
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
    dispatch(replyTicketSuccess());
  } catch (error) {
    console.log(error);
    dispatch(replyTicketFail(error.message));
  }
};
