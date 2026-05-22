const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Get my projects
router.get('/', auth, async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }]
  }).populate('owner', 'name').populate('members', 'name');
  res.json(projects);
});

// Create project
router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({ name, description, owner: req.user._id, members: [req.user._id] });
  await project.populate('owner', 'name');
  await project.populate('members', 'name');
  res.status(201).json(project);
});

// Get single project
router.get('/:id', auth, async (req, res) => {
  const project = await Project.findById(req.params.id).populate('owner', 'name').populate('members', 'name');
  if (!project) return res.status(404).json({ message: 'Not found' });
  res.json(project);
});

// Add member
router.post('/:id/members', auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  if (project.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Only owner can add members' });
  if (!project.members.includes(req.body.userId)) {
    project.members.push(req.body.userId);
    await project.save();
  }
  await project.populate('members', 'name');
  res.json(project);
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Not found' });
  if (project.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
  await project.deleteOne();
  res.json({ message: 'Deleted' });
});

module.exports = router;
