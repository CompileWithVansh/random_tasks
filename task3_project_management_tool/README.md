# Project Management Tool

A simple Trello-like project management app with boards, tasks, and collaboration.

## Features

- User registration & login
- Create and delete projects
- Add members to projects
- Create tasks with status (To Do, In Progress, Done)
- Move tasks between columns
- Comment on tasks
- Delete tasks

## Project Structure

```
task3_project_management_tool/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Projects.jsx
    │   │   ├── Board.jsx
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

Open http://localhost:3002

### Test Accounts
- user1@test.com / test123
- user2@test.com / test123
