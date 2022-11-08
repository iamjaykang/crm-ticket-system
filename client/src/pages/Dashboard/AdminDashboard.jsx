import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import TicketTable from "../../components/TicketTable/TicketTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTicketsAdmin } from "../TicketList/ticketsAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const { isAdmin } = useSelector((state) => state.adminSignin);

  useEffect(() => {
    if (isAdmin && !tickets.length) {
      dispatch(fetchAllTicketsAdmin());
    }
  }, [tickets, dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totatTickets = tickets.length;
  return (
    <div className="container flex flex-col">
      <div className="mb-6">
        <BreadCrumb page="Dashboard" />
      </div>
      <div className=""></div>
      <div>
        <div className="text-black text-xl dark:text-gray-400">
          Admin Dashboard
        </div>
        <div className="text-black text-xl dark:text-gray-400">
          Total tickets: {totatTickets}
        </div>
        <div className="text-black text-xl dark:text-gray-400">
          Pending tickets: {pendingTickets.length}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="mt-2 dark:text-gray-200">Recently Added tickets</div>{" "}
      </div>
      <div className="mt-2">
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
};

export default AdminDashboard;
