# Social Media Platform

A simple social media app with posts, comments, likes, and follow system.

## Features

- User registration & login
- Create, delete posts
- Like & unlike posts
- Comment on posts
- Follow/unfollow users
- User profiles with stats
- Feed (posts from followed users)

## Project Structure

```
task2_social_media_platform/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Feed.jsx
    │   │   ├── Explore.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── style.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT

## Setup

```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:3001

### Test Accounts
- user1@test.com / test123
- user2@test.com / test123
