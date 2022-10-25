import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import tickets from "../../assets/data/dummyTicket.json";
import MessageHistory from "../../components/MessageHistory/MessageHistory";
import UpdateTicket from "../../components/UpdateTicket/UpdateTicket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTicket } from "../TicketList/ticketsAction";

// const ticket = tickets[0];

const Ticket = () => {
  let { tId } = useParams();
  console.log(tId);
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, replyMsg, replyTicketError } =
    useSelector((state) => state.tickets);

  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");

  const onChangeHandler = (e) => {
    const { value } = e.target;

    setMessage(value);
  };

  const onSubmitHandler = (e) => {
    alert("Form submitted!");
  };

  //   if ticket id equals params id ticket is set to the ticket
  useEffect(() => {
    dispatch(fetchSingleTicket(tId));
  }, [message, tId]);
  return (
    <div className="container">
      <div>
        <BreadCrumb page="Ticket" />
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-lg">
          <div className="font-bold">
            Subject: <span className="font-normal">{selectedTicket.subject}</span>
          </div>
          <div className="font-bold">
            Ticket Opened: <span className="font-normal">{selectedTicket.openedAt}</span>
          </div>
          <div className="font-bold">
            Status: <span className="font-normal">{selectedTicket.status}</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-cyan-600 focus:outline-none bg-white rounded-lg border border-cyan-600 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Close Ticket
          </button>
        </div>
      </div>
      <div>
        {ticket.history && <MessageHistory messages={ticket.history} />}
      </div>
      <div className="mt-4">
        <UpdateTicket
          message={message}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
      </div>
    </div>
  );
};

export default Ticket;
