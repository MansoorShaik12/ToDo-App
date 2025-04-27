import React from 'react';

const StatsDashboard = ({ todos, darkMode }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div
      className={`p-6 rounded-lg mb-6 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-100'
      } animate-fade-in`}
      style={{ animationDelay: '0.3s' }}
    >
      <h2
        className={`text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-800'
        } mb-4`}
      >
        Stats
      </h2>
      <div className="flex flex-wrap gap-6">
        <div>
          <span className="font-medium">Total: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {totalTodos}
          </span>
        </div>
        <div>
          <span className="font-medium">Completed: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {completedTodos}
          </span>
        </div>
        <div>
          <span className="font-medium">Pending: </span>
          <span className={darkMode ? 'text-white' : 'text-gray-700'}>
            {pendingTodos}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;