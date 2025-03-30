import React from 'react';
import { motion } from 'framer-motion';

const TodoForm = ({ text, setText, category, setCategory, priority, setPriority, dueDate, setDueDate, addOrUpdateTodo, editId, darkMode }) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={addOrUpdateTodo}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`p-3 border rounded-lg transition duration-200 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`p-3 border rounded-lg transition duration-200 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={`p-3 border rounded-lg transition duration-200 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="col-span-2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
      >
        {editId ? 'Update Task' : 'Add Task'}
      </motion.button>
    </motion.form>
  );
};

export default TodoForm;