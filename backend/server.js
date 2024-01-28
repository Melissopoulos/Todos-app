require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("CONNECTED TO DATABASE SUCCESSFULLY");
});
db.on("error", (error) => {
  console.error("Error connecting to database:", error);
});

// Routes
const todosRouter = require("./routes/todos");
app.use("/todos", todosRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
