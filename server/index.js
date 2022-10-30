require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 5000;
const path = require("path");

// API security
// app.use(helmet());

let corsOptions = {
  origin: [process.env.HEROKU_URL],
};

// handle CORS error
process.env.NODE_ENV === "production"
  ? app.use(cors(corsOptions))
  : app.use(cors());

//MongoDB Connection set up
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const mDb = mongoose.connection;
mDb.on("open", () => {
  console.log("MongoDB is connected");
});

mDb.on("error", (error) => {
  console.log(error);
});

// Set body bodyparser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load routers

const userRouter = require("./src/routers/user-router");
const ticketRouter = require("./src/routers/ticket-router");
const tokensRouter = require("./src/routers/tokens-router");

// Routers

{
  process.env.NODE_ENV === "production"
    ? app.use("/api/user", userRouter)
    : app.use("/v1/user", userRouter);
}
{
  process.env.NODE_ENV === "production"
    ? app.use("/api/ticket", ticketRouter)
    : app.use("/v1/ticket", ticketRouter);
}

{
  process.env.NODE_ENV === "production"
    ? app.use("/api/tokens", tokensRouter)
    : app.use("/v1/tokens", tokensRouter);
}
// --------------------------deployment------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

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
