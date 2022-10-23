const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

// API security
app.use(helmet());

// handle CORS error
app.use(cors());

// Set body bodyparser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// Load routers

const userRouter = require("./src/routers/user-router");
const ticketRouter = require("./src/routers/ticket-router");
const tokensRouter = require("./src/routers/tokens-router");

// Routers

app.use("/v1/user", userRouter);

app.use("/v1/ticket", ticketRouter);

app.use("/v1/tokens", tokensRouter);

// Error handler

const handleError = require("./src/utils/errorHandler");

app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
