const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

// Get tasks for a project
router.get('/project/:projectId', auth, async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId })
    .populate('assignee', 'name')
    .populate('comments.user', 'name')
    .sort({ createdAt: -1 });
  res.json(tasks);
});

// Create task
router.post('/', auth, async (req, res) => {
  const { title, description, project, assignee } = req.body;
  const task = await Task.create({ title, description, project, assignee });
  await task.populate('assignee', 'name');
  res.status(201).json(task);
});

// Update task status
router.put('/:id', auth, async (req, res) => {
  const { status, title, description, assignee } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { status, title, description, assignee }, { new: true })
    .populate('assignee', 'name');
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.json(task);
});

// Add comment to task
router.post('/:id/comment', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  task.comments.push({ user: req.user._id, text: req.body.text });
  await task.save();
  await task.populate('comments.user', 'name');
  res.json(task.comments);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
