const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/admin/dashboard', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard 🚀' });
});

router.get('/student/tasks', authenticate, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Here are your student tasks 📚' });
});

module.exports = router;
