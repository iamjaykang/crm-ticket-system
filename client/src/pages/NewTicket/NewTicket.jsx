import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import NewTicketForm from "../../components/NewTicketForm/NewTicketForm";

const NewTicket = () => {
  return (
    <div className="container">
      <div className="mb-8">
        <BreadCrumb page="New Ticket" />
      </div>
      <div>
        <div className="shadow-2xl">
          <NewTicketForm />
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
