const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔐 Authenticated routes
router.post('/create', authenticate, createTask);
router.get('/all', authenticate, getTasks);

module.exports = router;
