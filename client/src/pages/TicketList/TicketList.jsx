import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets, fetchAllTicketsAdmin } from "./ticketsAction";
import { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SearchForm from "../../components/SearchForm/SearchForm";
import TicketTable from "../../components/TicketTable/TicketTable";
import { Link } from "react-router-dom";

const TicketList = () => {
  const { isAdmin } = useSelector((state) => state.adminSignin);
  const dispatch = useDispatch();

  useEffect(() => {
    {
      isAdmin ? dispatch(fetchAllTicketsAdmin()) : dispatch(fetchAllTickets());
    }
  }, [dispatch]);
  return (
    <div className="container my-4">
      <div className="mb-8">
        <BreadCrumb page="Ticket List" />
      </div>
      <div className="">
        <div className="flex justify-between">
          <Link to="/new-ticket">
            <button
              type="button"
              className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add new ticket
            </button>
          </Link>
          <SearchForm />
        </div>
        <div className="p-4">
          <TicketTable />
        </div>
      </div>
    </div>
  );
};

export default TicketList;
