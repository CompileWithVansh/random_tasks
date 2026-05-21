const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();

// Get feed (posts from followed users + own)
router.get('/feed', auth, async (req, res) => {
  const posts = await Post.find({ user: { $in: [...req.user.following, req.user._id] } })
    .populate('user', 'name')
    .populate('comments.user', 'name')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Get all posts
router.get('/', auth, async (req, res) => {
  const posts = await Post.find()
    .populate('user', 'name')
    .populate('comments.user', 'name')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Get posts by user
router.get('/user/:userId', auth, async (req, res) => {
  const posts = await Post.find({ user: req.params.userId })
    .populate('user', 'name')
    .populate('comments.user', 'name')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Create post
router.post('/', auth, async (req, res) => {
  const post = await Post.create({ user: req.user._id, content: req.body.content });
  await post.populate('user', 'name');
  res.status(201).json(post);
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
  await post.deleteOne();
  res.json({ message: 'Deleted' });
});

// Like/unlike
router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  const liked = post.likes.includes(req.user._id);
  if (liked) post.likes.pull(req.user._id);
  else post.likes.push(req.user._id);
  await post.save();
  res.json({ likes: post.likes });
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Not found' });
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  await post.populate('comments.user', 'name');
  res.json(post.comments);
});

module.exports = router;
