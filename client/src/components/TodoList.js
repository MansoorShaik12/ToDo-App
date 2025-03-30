import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, setTodos, toggleComplete, editTodo, deleteTodo, darkMode }) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) return;

    const newTodos = [...filteredTodos];
    const [draggedTodo] = newTodos.splice(draggedItem, 1);
    newTodos.splice(dropIndex, 0, draggedTodo);
    setTodos(newTodos);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <ul className="space-y-3 max-h-96 overflow-y-auto">
      {filteredTodos.map((todo, index) => (
        <div
          key={todo._id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          <TodoItem
            todo={todo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            darkMode={darkMode}
            index={index}
          />
        </div>
      ))}
    </ul>
  );
};

export default TodoList;