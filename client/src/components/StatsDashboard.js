import React from 'react';
import { motion } from 'framer-motion';

const StatsDashboard = ({ todos, darkMode }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
    >
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Stats
      </h2>
      <div className="flex gap-4 mt-2">
        <div>
          <span className="font-medium">Total: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>{totalTodos}</span>
        </div>
        <div>
          <span className="font-medium">Completed: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>{completedTodos}</span>
        </div>
        <div>
          <span className="font-medium">Pending: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>{pendingTodos}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsDashboard;