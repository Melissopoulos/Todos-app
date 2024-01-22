const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectionString = "mongodb://127.0.0.1:27017/todo-app";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(connectionString, {
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

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific todo
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { title, description, completed, userId } = req.body;
    const todo = new Todo({ title, description, completed, userId });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
