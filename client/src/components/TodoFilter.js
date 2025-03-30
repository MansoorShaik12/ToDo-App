import React from 'react';
import { motion } from 'framer-motion';

const TodoFilter = ({ filter, setFilter, categoryFilter, setCategoryFilter, darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex gap-2 mb-4 flex-wrap"
    >
      {['All', 'Completed', 'Pending'].map(f => (
        <motion.button
          key={f}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            filter === f
              ? 'bg-indigo-600 text-white'
              : darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {f}
        </motion.button>
      ))}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={`p-2 border rounded-lg transition duration-200 ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-800'
        }`}
      >
        <option value="All">All Categories</option>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </motion.div>
  );
};

export default TodoFilter;