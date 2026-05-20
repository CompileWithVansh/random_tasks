# E-commerce Store

A simple full-stack e-commerce application.

## Features

- User registration & login
- Product listings with categories & search
- Shopping cart (add, remove, update quantity)
- Checkout with shipping address
- Order history
- Admin: add/edit/delete products

## Project Structure

```
task1_ecommerce_store/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   └── order.routes.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Orders.jsx
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

Open http://localhost:3000

### Test Accounts
- Admin: admin@shop.com / admin123
- User: user@test.com / test123
