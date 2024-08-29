const express = require("express");
const { createtodo, updatetodo } = require("./types.js");
const { todo, connectDB } = require("./db.js");
const cors = require("cors");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

// Create a new todo
app.post("/todo", async function(req, res) {
  const createPayload = req.body;
  const parsedPayload = createtodo.safeParse(createPayload);
  
  if (!parsedPayload.success) {
    return res.status(400).json({
      msg: "Invalid input data",
    });
  }
  
  try {
    // Insert data into MongoDB
    const newTodo = await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false
    });
    
    res.status(201).json({
      msg: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error creating todo",
      error: error.message
    });
  }
});

// Fetch all todos
app.get("/todos", async function(req, res) {
  try {
    const todos = await todo.find({});
    res.json(todos); // Return the todos directly as an array
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching todos",
      error: error.message
    });
  }
});

// Update a todo's completed status
app.put("/todos/:id", async function(req, res) {
  const updatePayload = req.body;
  const parsedPayload = updatetodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    return res.status(400).json({
      msg: "Invalid input data",
    });
  }

  try {
    const updatedTodo = await todo.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    res.json({
      msg: "Todo marked as completed",
      todo: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error updating todo",
      error: error.message
    });
  }
});

// Delete a todo
app.delete("/todo/:id", async function(req, res) {
  try {
    const deletedTodo = await todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        msg: "Todo not found",
      });
    }

    res.json({
      msg: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting todo",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
