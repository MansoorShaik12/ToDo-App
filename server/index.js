const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Todo Schema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  dueDate: { type: Date },
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
// Get all todos
app.get('/todos', async (req, res) => {
  try {
    console.log('GET /todos - Fetching all todos...');
    const todos = await Todo.find();
    console.log('Todos fetched:', todos);
    res.json(todos);
  } catch (err) {
    console.error('GET /todos - Error fetching todos:', err);
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
});

// Add todo
app.post('/todos', async (req, res) => {
  try {
    console.log('POST /todos - Adding new todo:', req.body);
    const newTodo = new Todo(req.body);
    await newTodo.save();
    console.log('Todo added:', newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('POST /todos - Error adding todo:', err);
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
});

// Update todo
app.put('/todos/:id', async (req, res) => {
  try {
    console.log('PUT /todos/:id - Updating todo with ID:', req.params.id, 'Data:', req.body);
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      console.log('PUT /todos/:id - Todo not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo updated:', todo);
    res.json(todo);
  } catch (err) {
    console.error('PUT /todos/:id - Error updating todo:', err);
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    console.log('DELETE /todos/:id - Deleting todo with ID:', req.params.id);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      console.log('DELETE /todos/:id - Todo not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo deleted:', todo);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('DELETE /todos/:id - Error deleting todo:', err);
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));