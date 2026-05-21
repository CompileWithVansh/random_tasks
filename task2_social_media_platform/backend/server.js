const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}).catch(err => { console.error(err); process.exit(1); });
