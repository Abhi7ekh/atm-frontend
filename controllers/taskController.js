const connectDB = require('../utils/db');

const TASKS_DB = 'tasks';

// ===========================
// ➕ CREATE TASK (Admin)
// ===========================
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !description || !assignedTo) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const { cloudantClient } = await connectDB();

    const task = {
      title,
      description,
      assignedTo,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const response = await cloudantClient.postDocument({
      db: TASKS_DB,
      document: task,
    });

    res.status(201).json({
      success: true,
      message: 'Task created ✅',
      taskId: response.result.id,
    });
  } catch (err) {
    console.error('❌ Create Task Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error during task creation' });
  }
};

// ===========================
// 🎓 GET TASKS FOR LOGGED-IN STUDENT
// ===========================
exports.getMyTasks = async (req, res) => {
  try {
    const { cloudantClient } = await connectDB();

    const result = await cloudantClient.postFind({
      db: TASKS_DB,
      selector: {
        assignedTo: req.user.email,
      },
    });

    res.json({
      success: true,
      tasks: result.result.docs,
    });
  } catch (err) {
    console.error('❌ Get My Tasks Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching student tasks' });
  }
};

// ===========================
// 🛡️ GET ALL TASKS (Admin)
// ===========================
exports.getAllTasks = async (req, res) => {
  try {
    const { cloudantClient } = await connectDB();

    const result = await cloudantClient.postAllDocs({
      db: TASKS_DB,
      includeDocs: true,
    });

    const tasks = result.result.rows.map((row) => row.doc);

    res.json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.error('❌ Get All Tasks Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching all tasks' });
  }
};

// ===========================
// ✏️ UPDATE TASK (Admin)
// ===========================
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const { cloudantClient } = await connectDB();

    const existing = await cloudantClient.getDocument({
      db: TASKS_DB,
      docId: id,
    });

    const updatedTask = {
      ...existing.result,
      title: title || existing.result.title,
      description: description || existing.result.description,
      assignedTo: assignedTo || existing.result.assignedTo,
      status: status || existing.result.status,
      updatedAt: new Date().toISOString(),
    };

    const response = await cloudantClient.putDocument({
      db: TASKS_DB,
      docId: id,
      document: updatedTask,
    });

    res.json({
      success: true,
      message: 'Task updated ✅',
    });
  } catch (err) {
    console.error('❌ Update Task Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error during task update' });
  }
};

// ===========================
// 🗑️ DELETE TASK (Admin)
// ===========================
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { cloudantClient } = await connectDB();

    const existing = await cloudantClient.getDocument({
      db: TASKS_DB,
      docId: id,
    });

    const response = await cloudantClient.deleteDocument({
      db: TASKS_DB,
      docId: id,
      rev: existing.result._rev,
    });

    res.json({
      success: true,
      message: 'Task deleted ✅',
    });
  } catch (err) {
    console.error('❌ Delete Task Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error during task deletion' });
  }
};
