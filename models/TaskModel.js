// models/TaskModel.js

const taskDbName = process.env.CLOUDANT_DB_NAME + '_tasks';

const createTaskDoc = (task) => ({
  _id: task.id || new Date().toISOString(),
  title: task.title,
  description: task.description,
  assignedTo: task.assignedTo,
  status: task.status || 'pending',
});

module.exports = {
  taskDbName,
  createTaskDoc,
};
