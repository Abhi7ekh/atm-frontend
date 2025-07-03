// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth Routes
app.use('/api/auth', authRoutes);

// ✅ Task Routes (added for Step 3)
app.use('/api/tasks', taskRoutes);

// ✅ Default Route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Advanced Task Manager API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
