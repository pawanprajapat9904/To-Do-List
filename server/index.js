const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Todo = require('./models/Todo');
const authRoutes = require("./routes/auth"); 
const app = express(); 


app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas (Cloud)"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

app.get('/todos/:username', async (req, res) => {
  const todos = await Todo.find({ username: req.params.username });
  res.json(todos);
});

app.post('/todos/new', async (req, res) => {
  const newTodo = new Todo({
    username: req.body.username,
    task: req.body.task
  });
  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

app.delete('/todos/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.put('/todos/toggle/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
