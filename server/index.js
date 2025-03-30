const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Debug startup info
console.log('Server starting...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection first - before using any models
console.log('Attempting MongoDB connection...');
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

// API Routes - Define after creating the models
// Add a basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running', 
    env: process.env.NODE_ENV,
    mongo_uri: process.env.MONGO_URI ? 'Set (hidden for security)' : 'Not set'
  });
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    console.log('GET /api/todos - Fetching all todos...');
    const todos = await Todo.find();
    console.log('Todos fetched:', todos);
    res.json(todos);
  } catch (err) {
    console.error('GET /api/todos - Error fetching todos:', err);
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
});

// Add todo
app.post('/api/todos', async (req, res) => {
  try {
    console.log('POST /api/todos - Adding new todo:', req.body);
    const newTodo = new Todo(req.body);
    await newTodo.save();
    console.log('Todo added:', newTodo);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('POST /api/todos - Error adding todo:', err);
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    console.log('PUT /api/todos/:id - Updating todo with ID:', req.params.id, 'Data:', req.body);
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
      console.log('PUT /api/todos/:id - Todo not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo updated:', todo);
    res.json(todo);
  } catch (err) {
    console.error('PUT /api/todos/:id - Error updating todo:', err);
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
});

// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    console.log('DELETE /api/todos/:id - Deleting todo with ID:', req.params.id);
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      console.log('DELETE /api/todos/:id - Todo not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('Todo deleted:', todo);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error('DELETE /api/todos/:id - Error deleting todo:', err);
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
});

// Static file serving - Must be defined AFTER API routes to prevent interference
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static file serving for production');
  
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Route all other requests to React app (must be after API routes)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
} else {
  // Basic root route for non-production environments
  app.get('/', (req, res) => {
    res.send('Todo API server is running (development mode)');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));