const express = require("express");
const { userAuthorization } = require("../middlewares/authorization");
const { insertTicket, getTickets, getTicketById } = require("../models/ticket/ticket-model");
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
router.post("/", userAuthorization, async (req, res) => {
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
});

// Get all tickets router for a specific user
router.get("/", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;

    const result = await getTickets(clientId);

    if (result.length) {
      return res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// Get ticket by id for a specific user
router.get("/:_id", userAuthorization, async (req, res) => {
  console.log(req.params)
  try {
    const {_id} = req.params;
    const clientId = req.userId;

    const result = await getTicketById(_id,clientId);

    if (result.length) {
      return res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
