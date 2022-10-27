import React, { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import MessageHistory from "../../components/MessageHistory/MessageHistory";
import UpdateTicket from "../../components/UpdateTicket/UpdateTicket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeTicket, fetchSingleTicket } from "../TicketList/ticketsAction";
import { getUserProfile } from "../Dashboard/userAction";
import { resetStatusReplyMsg } from "../TicketList/ticketsSlice";
import Spinner from "../../components/Spinner/Spinner";

// const ticket = tickets[0];

const Ticket = () => {
  let { tId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, statusReplyMsg } = useSelector(
    (state) => state.tickets
  );
  const {
    user: { _id },
  } = useSelector((state) => state.user);

  //   if ticket id equals params id ticket is set to the ticket
  useEffect(() => {
    dispatch(fetchSingleTicket(tId));
    !_id && dispatch(getUserProfile());
    statusReplyMsg && dispatch(resetStatusReplyMsg());
  }, [tId, dispatch]);
  return (
    <div className="container">
      <div>
        <BreadCrumb page="Ticket" />
      </div>
      <div>
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}
        {statusReplyMsg && (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="success"
          >
            {statusReplyMsg}
          </div>
        )}
        {isLoading && <Spinner />}
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-lg">
          <div className="font-bold">
            Subject:{" "}
            <span className="font-normal">{selectedTicket.subject}</span>
          </div>
          <div className="font-bold">
            Ticket Opened:{" "}
            <span className="font-normal">
              {selectedTicket.openedAt &&
                new Date(selectedTicket.openedAt).toLocaleString()}
            </span>
          </div>
          <div className="font-bold">
            Status: <span className="font-normal">{selectedTicket.status}</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-cyan-600 focus:outline-none bg-white rounded-lg border border-cyan-600 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => dispatch(closeTicket(tId))}
            disabled={selectedTicket.status === "Closed"}
          >
            Close Ticket
          </button>
        </div>
      </div>
      <div>
        {selectedTicket.conversations && (
          <MessageHistory messages={selectedTicket.conversations} />
        )}
      </div>
      <div className="mt-4">
        <UpdateTicket _id={tId} />
      </div>
    </div>
  );
};

export default Ticket;
