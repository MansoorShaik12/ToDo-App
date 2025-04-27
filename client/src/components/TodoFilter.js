import React from 'react';

const TodoFilter = ({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  darkMode,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex gap-2">
        {['All', 'Completed', 'Pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${
              filter === f
                ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={`p-3 border rounded-md transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      >
        <option value="All">All Categories</option>
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`p-3 border rounded-md transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      >
        <option value="none">Sort: None</option>
        <option value="priority">Sort: Priority</option>
        <option value="dueDate">Sort: Due Date</option>
      </select>
    </div>
  );
};

export default TodoFilter;