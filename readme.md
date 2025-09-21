# 🛒 Products API & Frontend

A simple **Products Management App** built with **Node.js, Express, MongoDB, Mongoose** for the backend and **React** for the frontend.  
Includes **JWT authentication with refresh tokens**, product CRUD APIs, and a React UI to view/add/filter products.

Fontend Live Link: https://products-api-adm5.onrender.com

Backend Live Link: https://products-api-backend-ligl.onrender.com

---

## 🚀 Features

### Backend

- Node.js + Express + MongoDB + Mongoose
- User authentication (JWT access + refresh tokens, HttpOnly cookies)
- Product CRUD operations
- Filtering endpoints:
  - Featured products
  - Products with price less than X
  - Products with rating greater than Y
- Validation using Mongoose schema rules
- CORS setup for only the frontend origin
- Cookie Parser for refresh tokens

### Frontend (React)

- Signup & Login with validation
- Add new product (form validation included)
- View all products
- Filter products by **price and featured**
- Uses `fetch` (no axios)

---

## ⚙️ Installation & Setup

### 1️⃣ Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=port
MONGODB_URI=mongodb_uri
ACCESS_TOKEN_SECRET=your_jwt_access_secret_here
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_here
FRONTEND_URL=frontend_url
```

Run server:

```bash
npm run dev
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 API Endpoints

### Auth

- `POST /api/auth/signup` → Register user
- `POST /api/auth/login` → Login (sets refresh token cookie, returns access token)
- `POST /api/auth/refresh-token` → Get new access token
- `POST /api/auth/logout` → Logout

### Products

- `POST /api/products` → Add product
- `GET /api/products` → Get all products (supports query filters)
- `GET /api/product/:id` → Get a single product
- `PUT /api/products/:id` → Update product
- `DELETE /api/products/:id` → Delete product

---
