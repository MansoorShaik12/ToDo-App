import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-8 animate-fade-in">
      <h1
        className={`text-3xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Mansoor's
        </span>{' '}
        Todo Master
      </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-full ${
          darkMode
            ? 'bg-gray-700 hover:bg-gray-600'
            : 'bg-gray-200 hover:bg-gray-300'
        } transition-all duration-300`}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default Header;