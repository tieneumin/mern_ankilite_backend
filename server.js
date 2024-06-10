const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGODB_URL } = require("./config");

const app = express();

// JSON middleware
app.use(express.json());

// static uploads folder path
app.use("/uploads", express.static("uploads"));

// CORS policy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});
app.use(corsHandler);

// MongoDB connection
mongoose
  .connect(
    MONGODB_URL + "flashcard"
    // "mongodb://127.0.0.1:27017/flashcard"
  )
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

// imports
const authRouter = require("./routes/auth");
const cardRouter = require("./routes/card");
const deckRouter = require("./routes/deck");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const categoryRouter = require("./routes/category");

// routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cards", cardRouter);
app.use("/decks", deckRouter);
app.use("/images", imageRouter);
app.use("/categories", categoryRouter);

// server start
app.listen(1337, () => {
  console.log("Server running at http://localhost:1337.");
});
