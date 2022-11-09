import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import TicketTable from "../../components/TicketTable/TicketTable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "../TicketList/ticketsAction";
import Spinner from "../../components/Spinner/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const { status, isDeleteLoading, deleteTicketMsg } = useSelector(
    (state) => state.deleteTicket
  );
  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;
  useEffect(() => {
    {
      !totalTickets && dispatch(fetchAllTickets());
    }
  }, [dispatch, pendingTickets, totalTickets]);
  return (
    <div className="container flex flex-col">
      <div className="mb-6">
        <BreadCrumb page="Dashboard" />
      </div>
      <div className=""></div>
      <div>
        <div className="text-black text-xl dark:text-gray-400">
          Total tickets: {!totalTickets ? "0" : totalTickets}
        </div>
        <div className="text-black text-xl dark:text-gray-400">
          Pending tickets: {pendingTickets.length}
        </div>
      </div>
      {status === "success" ? (
        <div>{deleteTicketMsg}</div>
      ) : (
        <div>{deleteTicketMsg}</div>
      )}
      <div className="flex justify-between mt-4">
        {isDeleteLoading && <Spinner />}
        <div className="mt-2 dark:text-gray-200">
          Recently Added tickets
        </div>{" "}
        <Link to="/new-ticket">
          <button
            type="button"
            className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
          >
            Add new ticket
          </button>
        </Link>
      </div>
      <div className="mt-2">
        <TicketTable />
      </div>
    </div>
  );
};

export default Dashboard;
