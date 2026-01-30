# 🎬 Movie Management System – Backend

This is the backend API for the **Movie Management System**, built using **Node.js, Express, and MongoDB**.  
It provides secure REST APIs with **JWT authentication** and **admin-only access**.

---

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## ✨ Features
- Admin authentication using JWT
- Role-based authorization
- CRUD operations for movies
- Protected routes
- Secure middleware handling

---

## 📂 Folder Structure
```
Server/
├── controllers/
├── routes/
├── middleware/
├── models/
├── seed/
├── config/
└── server.js
```

---



---

## ▶️ Run Backend Locally

```bash
npm install
npm run dev
```

Backend will run on:
```
(https://binnys-backend-production.up.railway.app/)
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/login | Admin login |

### Movies
| Method | Endpoint | Access |
|------|---------|--------|
| GET | /api/movies | Public |
| POST | /api/movies | Admin |
| PUT | /api/movies/:id | Admin |
| DELETE | /api/movies/:id | Admin |

---

## 🧠 Explanation
The backend is built using Express and MongoDB with JWT-based authentication and role-based access control. Only admin users can perform create, update, and delete operations.

---

## 👨‍💻 Author
Tushar Prajapati
