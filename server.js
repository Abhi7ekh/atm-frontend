const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Advanced Task Manager API');
});

// API Routes
app.use('/api/auth', authRoutes);         // Registration & Login
app.use('/api/tasks', taskRoutes);        // Task Management
app.use('/api/protected', protectedRoutes); // Role Protected Routes

// Start server after DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to IBM Cloudant:', err.message);
    process.exit(1); // Exit process with failure
  });
