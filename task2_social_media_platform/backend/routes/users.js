const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all users
router.get('/', auth, async (req, res) => {
  const users = await User.find().select('name bio followers following');
  res.json(users);
});

// Get user profile
router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('name bio followers following');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Follow/unfollow
router.post('/:id/follow', auth, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ message: "Can't follow yourself" });
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found' });

    const isFollowing = req.user.following.includes(target._id);
    if (isFollowing) {
      req.user.following.pull(target._id);
      target.followers.pull(req.user._id);
    } else {
      req.user.following.push(target._id);
      target.followers.push(req.user._id);
    }
    await req.user.save();
    await target.save();
    res.json({ following: !isFollowing });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
