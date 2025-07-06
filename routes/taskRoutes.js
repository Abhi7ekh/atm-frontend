const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", authenticate, createTask);
router.get("/my", authenticate, getMyTasks);
router.get("/all", authenticate, getAllTasks);

// ✅ Add these only if you’ve defined them in taskController.js
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
