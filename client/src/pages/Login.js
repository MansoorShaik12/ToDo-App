import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.token, data.user);
      navigate('/todos');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex items-center justify-center px-4 sm:px-4 lg:px-4 xl:px-3">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Mansoor's Todo App</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea] transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
          </button>
          {error && (
            <p className="text-red-500 text-center text-sm animate-fade-in">{error}</p>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#667eea] font-semibold hover:underline transition-all duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;