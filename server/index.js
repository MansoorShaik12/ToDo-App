// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');

// dotenv.config();
// const app = express();

// // Debug startup info
// console.log('Server starting with simplified configuration...');
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('PORT:', process.env.PORT);
// console.log('MONGO_URI:', process.env.MONGO_URI ? 'Is set (hidden)' : 'Not set');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// console.log('Attempting MongoDB connection...');
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected successfully');
//     setupTodoRoutes(); // Only set up todo routes after DB connection
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//   });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/todos', require('./routes/todos'));

// // Healthcheck route
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'ok', 
//     message: 'Server is running', 
//     env: process.env.NODE_ENV || 'not set',
//     time: new Date().toISOString()
//   });
// });

// // AFTER API routes, set up static file serving
// if (process.env.NODE_ENV === 'production') {
//   console.log('Setting up static file serving for production mode');
//   // Serve static files from the React build directory
//   app.use(express.static(path.join(__dirname, '../client/build')));
  
//   // For any other routes, serve the React app (must be AFTER API routes)
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });
// } else {
//   // For development - show a message that the server is running
//   app.get('/', (req, res) => {
//     res.send('Todo API server is running (development mode)');
//   });
// }

// // Update todo

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
// });






const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Debug .env file existence and content
const envPath = path.resolve(__dirname, '.env');
console.log('Checking .env file at:', envPath);
console.log('.env file exists:', fs.existsSync(envPath));

// Read and log raw .env file content
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('Raw .env file content:', envContent);
} catch (err) {
  console.error('Error reading .env file:', err);
}

// Load environment variables
const dotenvResult = dotenv.config({ path: envPath });
if (dotenvResult.error) {
  console.error('Dotenv parsing error:', dotenvResult.error);
} else {
  console.log('Dotenv parsed successfully:', dotenvResult.parsed);
}

// Debug environment variables
console.log('Server starting with simplified configuration...');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('PORT:', process.env.PORT || 'Not set');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set (hidden)' : 'Not set');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log('Attempting MongoDB connection...');
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined. Check .env file.');
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.use('/api/todos', require('./routes/todos'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Healthcheck route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running', 
    env: process.env.NODE_ENV || 'not set',
    time: new Date().toISOString()
  });
});

// AFTER API routes, set up static file serving
if (process.env.NODE_ENV === 'production') {
  console.log('Setting up static file serving for production mode');
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Todo API server is running (development mode)');
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});