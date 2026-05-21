const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Post.deleteMany({});

  const u1 = await User.create({ name: 'Alice', email: 'user1@test.com', password: 'test123', bio: 'Love coding!' });
  const u2 = await User.create({ name: 'Bob', email: 'user2@test.com', password: 'test123', bio: 'Full stack dev' });

  u1.following.push(u2._id);
  u2.followers.push(u1._id);
  await u1.save();
  await u2.save();

  await Post.create({ user: u1._id, content: 'Hello world! This is my first post 🎉' });
  await Post.create({ user: u2._id, content: 'Just finished building a cool project!' });
  await Post.create({ user: u1._id, content: 'React + Node is such a great combo for full stack apps' });

  console.log('Seeded! user1@test.com / test123, user2@test.com / test123');
  process.exit(0);
}
seed();
