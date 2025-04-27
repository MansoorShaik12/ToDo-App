const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Get all todos for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
});

// Add todo for authenticated user
router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({ ...req.body, user: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
});

// Update todo for authenticated user
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err.message });
  }
});

// Delete todo for authenticated user
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
});

module.exports = router;