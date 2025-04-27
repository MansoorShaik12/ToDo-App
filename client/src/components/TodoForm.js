import React from 'react';

const TodoForm = ({
  text,
  setText,
  category,
  setCategory,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addOrUpdateTodo,
  editId,
  darkMode,
}) => {
  return (
    <form
      onSubmit={addOrUpdateTodo}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in"
      style={{ animationDelay: '0.2s' }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`p-3 border rounded-md transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`p-3 border rounded-md transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
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
        className={`p-3 border rounded-md transition-all duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-gray-100 border-gray-200 text-gray-800'
        }`}
      />
      <button
        type="submit"
        className="col-span-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        {editId ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;