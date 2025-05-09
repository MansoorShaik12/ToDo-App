import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import StatsDashboard from './components/StatsDashboard';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('none');
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const todoListRef = useRef(null);

  useEffect(() => {
    fetchTodos();
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    checkDueDates();
  }, [todos]);

  console.log('API URL:', process.env.REACT_APP_API_URL);

  const fetchTodos = async () => {
    try {
      console.log('Fetching todos from backend...');
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiUrl}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Todos fetched:', res.data);
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      showNotification('Error', 'Failed to fetch todos.');
    }
  };

  const addOrUpdateTodo = async (e) => {
    e.preventDefault();
    if (!text) {
      console.log('No text provided, cannot add/update todo.');
      return;
    }

    const todoData = { text, category, priority, dueDate };

    try {
      if (editId) {
        console.log('Updating todo with ID:', editId, 'Data:', todoData);
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const token = localStorage.getItem('token');
        const res = await axios.put(`${apiUrl}/api/todos/${editId}`, todoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Updated todo:', res.data);
        setTodos(todos.map((todo) => (todo._id === editId ? res.data : todo)));
        showNotification('Task Updated', `${text} has been updated!`);
        setEditId(null);
      } else {
        console.log('Adding new todo:', todoData);
        const apiUrl = process.env.REACT_APP_API_URL || '';
        const token = localStorage.getItem('token');
        const res = await axios.post(`${apiUrl}/api/todos`, todoData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Added todo:', res.data);
        setTodos([...todos, res.data]);
        showNotification('Task Added', `${text} has been added to your list!`);
      }
      resetForm();
    } catch (err) {
      console.error('Error adding/updating todo:', err);
      showNotification('Error', 'Failed to add/update task.');
    }
  };

  const deleteTodo = async (id) => {
    console.log('Attempting to delete todo with ID:', id);
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      console.log('Todo not found with ID:', id);
      return;
    }
    try {
      console.log('Sending delete request to backend for ID:', id);
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Todo deleted successfully, updating state...');
      setTodos(todos.filter((todo) => todo._id !== id));
      showNotification('Task Deleted', `${todo.text} has been deleted!`);

      if (editId === id) {
        console.log('Deleted todo was in edit mode, resetting form...');
        setEditId(null);
        resetForm();
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      showNotification('Error', 'Failed to delete task.');
    }
  };

  const navigate = useNavigate();

  const toggleComplete = async (id) => {
    console.log('Attempting to toggle completion for todo with ID:', id);
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      console.log('Todo not found with ID:', id);
      return;
    }
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const token = localStorage.getItem('token');
      if (!token) {
        showNotification('Error', 'Please log in to continue.');
        navigate('/login');
        return;
      }
      console.log('Sending update request to backend for ID:', id, 'New completed status:', !todo.completed);
      const res = await axios.put(
        `${apiUrl}/api/todos/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Updated todo from backend:', res.data);
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error('Error toggling todo completion:', err);
      if (err.response?.status === 401) {
        showNotification('Error', 'Session expired. Please log in again.');
        navigate('/login');
      } else {
        showNotification('Error', 'Failed to update task status.');
      }
    }
  };

  const editTodo = (todo) => {
    console.log('Setting todo for editing:', todo);
    setEditId(todo._id);
    setText(todo.text);
    setCategory(todo.category);
    setPriority(todo.priority);
    setDueDate(todo.dueDate ? todo.dueDate.slice(0, 10) : '');
  };

  const clearCompleted = async () => {
    console.log('Attempting to clear all completed todos...');
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) {
      console.log('No completed todos to clear.');
      return;
    }
    try {
      for (const todo of completedTodos) {
        console.log('Deleting completed todo with ID:', todo._id);
        const apiUrl = process.env.REACT_APP_API_URL || '';
        await axios.delete(`${apiUrl}/api/todos/${todo._id}`);
      }
      console.log('Completed todos cleared, updating state...');
      setTodos(todos.filter((todo) => !todo.completed));
      showNotification('Completed Tasks Cleared', 'All completed tasks have been removed!');
    } catch (err) {
      console.error('Error clearing completed todos:', err);
      showNotification('Error', 'Failed to clear completed tasks.');
    }
  };

  const resetForm = () => {
    console.log('Resetting form...');
    setText('');
    setCategory('General');
    setPriority('Medium');
    setDueDate('');
  };

  const requestNotificationPermission = () => {
    console.log('Requesting notification permission...');
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const showNotification = (title, body) => {
    console.log('Showing notification:', title, body);
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  const checkDueDates = () => {
    console.log('Checking due dates for todos...');
    todos.forEach((todo) => {
      if (todo.dueDate && !todo.completed) {
        const due = new Date(todo.dueDate);
        const today = new Date();
        if (due.toDateString() === today.toDateString()) {
          console.log('Due today:', todo.text);
          showNotification('Due Today', `${todo.text} is due today!`);
        }
      }
    });
  };

  const exportToPDF = async () => {
    console.log('Exporting todos to PDF...');
    const element = todoListRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('todos.pdf');
    console.log('PDF exported successfully.');
  };

  const shareTodos = () => {
    console.log('Sharing todos...');
    const todoText = todos
      .map(
        (todo) =>
          `${todo.text} (${todo.category}, ${todo.priority}, Due: ${
            todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No Due Date'
          })`
      )
      .join('\n');
    if (navigator.share) {
      navigator.share({
        title: 'My Todos',
        text: todoText,
      }).catch((err) => console.error('Error sharing todos:', err));
    } else {
      console.log('Share API not supported, showing alert...');
      alert('Share API not supported. Copy this text to share:\n\n' + todoText);
    }
  };

  const sortTodos = (todosToSort) => {
    console.log('Sorting todos by:', sortBy);
    let sortedTodos = [...todosToSort];
    if (sortBy === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sortedTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'dueDate') {
      sortedTodos.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
        const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
        return dateA - dateB;
      });
    }
    return sortedTodos;
  };

  const filteredTodos = todos
    .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
    .filter((todo) =>
      filter === 'All' ? true : filter === 'Completed' ? todo.completed : !todo.completed
    )
    .filter((todo) => categoryFilter === 'All' || todo.category === categoryFilter);

  const sortedTodos = sortTodos(filteredTodos);

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? 'bg-gray-800'
          : 'bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]'
      } flex items-center justify-center px-4 sm:px-4 lg:px-4 xl:px-3 transition-colors duration-300`}
    >
      <div
        className={`${
          darkMode ? 'bg-gray-900' : 'bg-white'
        } rounded-lg shadow-lg w-full max-w-3xl p-8 my-8 animate-fade-in`}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <StatsDashboard todos={todos} darkMode={darkMode} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todos..."
          className={`w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-gray-100 border-gray-200 text-gray-800'
          }`}
        />
        <TodoForm
          text={text}
          setText={setText}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addOrUpdateTodo={addOrUpdateTodo}
          editId={editId}
          darkMode={darkMode}
        />
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          darkMode={darkMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={clearCompleted}
            className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Clear Completed
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Export to PDF
          </button>
          <button
            onClick={shareTodos}
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300"
          >
            Share Todos
          </button>
        </div>
        <div ref={todoListRef}>
          <TodoList
            filteredTodos={sortedTodos}
            setTodos={setTodos}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;