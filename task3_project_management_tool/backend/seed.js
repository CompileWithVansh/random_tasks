const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Project.deleteMany({});
  await Task.deleteMany({});

  const u1 = await User.create({ name: 'Alice', email: 'user1@test.com', password: 'test123' });
  const u2 = await User.create({ name: 'Bob', email: 'user2@test.com', password: 'test123' });

  const project = await Project.create({ name: 'Website Redesign', description: 'Redesign the company website', owner: u1._id, members: [u1._id, u2._id] });

  await Task.create({ title: 'Design homepage mockup', status: 'done', project: project._id, assignee: u1._id });
  await Task.create({ title: 'Build navigation component', status: 'in_progress', project: project._id, assignee: u2._id });
  await Task.create({ title: 'Add contact form', status: 'todo', project: project._id, assignee: u1._id });
  await Task.create({ title: 'Write API documentation', status: 'todo', project: project._id });

  console.log('Seeded! user1@test.com / test123, user2@test.com / test123');
  process.exit(0);
}
seed();
