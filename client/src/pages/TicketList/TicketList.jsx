import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import SearchForm from "../../components/SearchForm/SearchForm";
import TicketTable from "../../components/TicketTable/TicketTable";
import tickets from "../../assets/data/dummyTicket.json";

const TicketList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dispTicket, setDispTicket] = useState(tickets);

  const onChangeHandler = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    searchTicket(searchInput)
  };

  const searchTicket = (input) => {
    const displayTicket = tickets.filter((row) =>
      row.subject.toLowerCase().includes(input.toLowerCase())
    );

    setDispTicket(displayTicket);
  };

  useEffect(() => {}, [searchInput, dispTicket]);
  return (
    <div className="container">
      <div className="mb-8">
        <BreadCrumb page="Ticket List" />
      </div>
      <div className="">
        <div className="flex justify-between">
          <button
            type="button"
            className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add new ticket
          </button>
          <SearchForm
            onChangeHandler={onChangeHandler}
            searchInput={searchInput}
            onSubmitHandler={onSubmitHandler}
          />
        </div>
        <div className="p-4">
          <TicketTable tickets={dispTicket} />
        </div>
      </div>
    </div>
  );
};

export default TicketList;
