const express = require("express");
const { userAuthorization } = require("../middlewares/authorization");
const {
  createNewTicketValidation,
  replyTicketMessageValidation,
} = require("../middlewares/formValidation-middleware");
const {
  insertTicket,
  getTickets,
  getTicketById,
  updateClientReply,
  updateStatusClosed,
  deleteTicket,
} = require("../models/ticket/ticket-model");
const router = express.Router();

// 1. create url endpoints
// 2. receive new ticket data
// 3. authorize every request with jwt
// 4. insert in mongodb
// 5. retreive all the tickets for specific user
// 6. retrieve a ticket from mongodb
// 7. update message conversation in the ticket database
// 8. update ticket status
// 9. delete ticket from mongodb

router.all("/", (req, res, next) => {
  // res.json({ message: "return from ticket router" });

  next();
});

// create url endpoints

// Create new ticket router
router.post(
  "/",
  createNewTicketValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { subject, sender, message } = req.body;

      const userId = req.userId;

      const ticketObj = {
        clientId: userId,
        subject,
        conversations: [
          {
            sender,
            message,
          },
        ],
      };

      const result = await insertTicket(ticketObj);
      if (result._id) {
        return res.json({
          status: "success",
          message: "New Ticket has been created!",
        });
      }
      res.json({
        status: "error",
        message: "Unable to create the ticket, please try again later",
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
);

// Get all tickets router for a specific user
router.get("/", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;

    const result = await getTickets(clientId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get ticket by id for a specific user
router.get("/:_id", userAuthorization, async (req, res) => {
  console.log(req.params);
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await getTicketById(_id, clientId);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Update reply message from client
router.put(
  "/:_id",
  replyTicketMessageValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const clientId = req.userId;

      const result = await updateClientReply({ _id, message, sender });

      if (result._id) {
        return res.json({
          status: "success",
          message: "Your message has been updated",
        });
      }
      res.json({
        status: "error",
        message: "Unable to update your message, please try again later",
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
);

// Update ticket status to close
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await updateStatusClosed({ _id, clientId });

    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }
    res.json({
      status: "error",
      message: "Unable to update the ticket, please try again later",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// Delete ticket
router.delete("/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;

    const result = await deleteTicket({ _id, clientId });

    return res.json({
      status: "success",
      message: "The ticket has been deleted!",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
