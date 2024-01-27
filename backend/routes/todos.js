const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { description, completed, priority } = req.body;
    const todo = new Todo({
      description,
      completed,
      priority,
      id,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific todo
router.get("/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

// Delete a todo
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.todo = todo;
  next();
}

module.exports = router;
