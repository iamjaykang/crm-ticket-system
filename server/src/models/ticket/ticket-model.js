const { promises } = require("nodemailer/lib/xoauth2");
const { TicketSchema } = require("./ticket-chema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save(ticketObj)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ _id, clientId })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insertTicket,
  getTickets,
  getTicketById
};
