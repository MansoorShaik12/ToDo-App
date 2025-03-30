import React from 'react';
import { FaEdit, FaTrash, FaBars } from 'react-icons/fa';

const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo, darkMode, index }) => {
  const priorityColors = {
    High: darkMode ? 'bg-red-800' : 'bg-red-100',
    Medium: darkMode ? 'bg-yellow-800' : 'bg-yellow-100',
    Low: darkMode ? 'bg-green-800' : 'bg-green-100',
  };

  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString();

  const handleToggleComplete = () => {
    console.log('Toggling complete for todo:', todo._id, 'Current completed status:', todo.completed);
    toggleComplete(todo._id);
  };

  const handleEdit = () => {
    console.log('Editing todo:', todo._id, todo);
    editTodo(todo);
  };

  const handleDelete = () => {
    console.log('Deleting todo:', todo._id);
    deleteTodo(todo._id);
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-150 ${
        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
      } ${priorityColors[todo.priority]} ${isDueToday && !todo.completed ? 'border-2 border-red-500' : ''}`}
    >
      {/* Drag Handle Icon */}
      <div className="mr-3 cursor-move">
        <FaBars
          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          title="Drag to reorder"
        />
      </div>

      {/* Todo Content */}
      <div className="flex-1">
        <span
          onClick={handleToggleComplete}
          className={`cursor-pointer font-medium ${
            todo.completed
              ? 'line-through text-gray-400'
              : darkMode
              ? 'text-white'
              : 'text-gray-700'
          }`}
        >
          {todo.text}
        </span>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {todo.category} | {todo.priority} | {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No Due Date'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className={`${
            darkMode ? 'text-blue-300 hover:text-blue-500' : 'text-blue-500 hover:text-blue-700'
          } font-semibold transition duration-150`}
        >
          <FaEdit className="inline mr-1" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className={`${
            darkMode ? 'text-red-300 hover:text-red-500' : 'text-red-500 hover:text-red-700'
          } font-semibold transition duration-150`}
        >
          <FaTrash className="inline mr-1" /> Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;