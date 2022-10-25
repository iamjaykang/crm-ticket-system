import { getAllTickets, getSingleTicket } from "../../api/ticketApi";
import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFail,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
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

//Actions for single ticket only
export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());
  try {
    const result = await getSingleTicket(_id);
    dispatch(fetchSingleTicketSuccess(result.data.result[0]));
  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};
