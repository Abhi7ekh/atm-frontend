const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const dotenv = require('dotenv');
dotenv.config();

const cloudant = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({ apikey: process.env.CLOUDANT_APIKEY }),
  serviceUrl: process.env.CLOUDANT_URL,
});

const DB_NAME = 'tasks';

// ✅ Add new task (Admin only)
const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    const role = req.user.role;
    if (role !== 'admin') return res.status(403).json({ error: 'Only admins can create tasks ❌' });

    const newTask = {
      title,
      description,
      assignedTo,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const response = await cloudant.postDocument({ db: DB_NAME, document: newTask });
    res.status(201).json({ message: 'Task created ✅', taskId: response.result.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task ❌', details: error.message });
  }
};

// 📋 View tasks (Admin: all | Student: only assigned)
const getTasks = async (req, res) => {
  try {
    const role = req.user.role;
    const email = req.user.email;

    const result = await cloudant.postAllDocs({ db: DB_NAME, includeDocs: true });
    const allTasks = result.result.rows.map(row => row.doc);

    const filteredTasks = role === 'admin'
      ? allTasks
      : allTasks.filter(task => task.assignedTo === email);

    res.status(200).json({ tasks: filteredTasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks ❌', details: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
};
