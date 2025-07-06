const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

router.get('/admin/dashboard', authenticate, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin Dashboard 👑' });
});

router.get('/student/dashboard', authenticate, authorizeRole('student'), (req, res) => {
  res.json({ message: 'Welcome Student Dashboard 🎓' });
});

module.exports = router;
