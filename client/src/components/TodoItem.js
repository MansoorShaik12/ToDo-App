import React from 'react';

const TodoItem = ({ todo, toggleComplete, editTodo, deleteTodo, darkMode }) => {
  return (
    <li
      className={`flex items-center justify-between p-4 rounded-md ${darkMode ? 'bg-gray-800' : 'bg-gray-50'
        } transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo._id)}
          className="w-5 h-5 rounded border-gray-300 focus:ring-[#667eea]"
        />
        <div>
          <p
            className={`${todo.completed
                ? 'line-through text-gray-500'
                : darkMode
                  ? 'text-white'
                  : 'text-gray-800'
              }`}
          >
            {todo.text}
          </p>
          <div className="text-sm text-gray-500">
            <span>{todo.category}</span> |{' '}
            <span
              className={
                todo.priority === 'High'
                  ? 'text-red-500'
                  : todo.priority === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
              }
            >
              {todo.priority}
            </span>{' '}
            |{' '}
            <span>
              {todo.dueDate
                ? new Date(todo.dueDate).toLocaleDateString()
                : 'No Due Date'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => editTodo(todo)}
          className="px-3 py-1 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;