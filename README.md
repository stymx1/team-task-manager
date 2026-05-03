TEAM TASK MANAGER (FULL STACK PROJECT)

---

## 📌 PROJECT OVERVIEW

This is a full-stack Task Manager application built using:

* Frontend: React (Vite)
* Backend: Node.js + Express
* Database: PostgreSQL (via Prisma ORM)

The application allows users to:

* Register & Login
* Create Projects
* Add Tasks
* Assign Members
* Manage tasks efficiently

---

## 🚀 LIVE DEPLOYMENT

Frontend: (Add your Vercel URL here)
Backend: (Add your Railway URL here)

---

## ⚙️ BACKEND SETUP

1. Navigate to backend folder:
   cd backend

2. Install dependencies:
   npm install

3. Create .env file:
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret
   PORT=5000

4. Run Prisma:
   npx prisma generate
   npx prisma migrate dev

5. Start server:
   npm run dev

---

## 💻 FRONTEND SETUP

1. Navigate to frontend folder:
   cd frontend

2. Install dependencies:
   npm install

3. Create .env file:
   VITE_API_URL=http://localhost:5000

4. Run frontend:
   npm run dev

---

## 🌐 DEPLOYMENT

Backend:

* Deployed on Railway
* Uses environment variables for DB & JWT
* Runs on process.env.PORT

Frontend:

* Deployed on Vercel
* API URL updated to production backend

---

## 🔐 AUTHENTICATION

* JWT based authentication
* Token required for protected routes
* Stored in localStorage (frontend)

---

## 📡 API ENDPOINTS

Auth:
POST /api/auth/register
POST /api/auth/login

Projects:
GET /api/projects
POST /api/projects

Tasks:
GET /api/tasks
POST /api/tasks

---

## ⚠️ COMMON ISSUES

* "No token" → login required
* CORS error → enable cors in backend
* Cannot GET / → root route missing
* Port issue → use process.env.PORT

---

## 📌 AUTHOR

Satyam Chauhan

---

## END OF FILE
# team-task-manager
