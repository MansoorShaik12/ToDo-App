import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-6"
    >
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Todo Master
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-200"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </motion.div>
  );
};

export default Header;