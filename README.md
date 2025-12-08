# 🎓 After School Club – Full Stack Web Application  
**Frontend (Vue.js 3 + Vite) – Final Coursework Project**

This repository contains the **frontend application** for my After School Club lesson-booking system.  
The project allows users to browse lessons, add them to a cart, and place an order.  
It is fully integrated with a hosted backend API on Render and uses MongoDB Atlas for database storage.

This application was built as part of the **CST3144 – Web Applications & Databases** module.

---

# 🔗 Live Demo

### 🌐 **Frontend (GitHub Pages)**  
👉 https://yugpatel17.github.io/FULLSTACK_PROJECT_FRONTEND/

### 🖥️ **Backend API (Render)**  
👉 https://after-school-backend-ri4h.onrender.com/

### 📦 **Backend Repository**  
👉 https://github.com/YUGPATEL17/FULLSTACK_PROJECT_BACKEND

---

# 🧩 Project Overview

The After School Club app provides:

- A modern, mobile-friendly lesson browsing interface  
- Searching + sorting (title, location, price, spaces)  
- Add-to-cart functionality with space validation  
- A checkout system with name + phone validation  
- Backend integration for live updates  
- Orders saved in MongoDB  
- Admin page to view all orders  

This fully meets the coursework requirements for:  
✔ Frontend SPA  
✔ Backend API  
✔ Database integration  
✔ Validation  
✔ CRUD operations  
✔ Deployment  
✔ Documentation  

---

# 🧪 Screenshots (optional for submission)

> Add screenshots such as:
- Home page  
- Lesson listings  
- Cart  
- Checkout success  
- Admin orders page  

```
/screenshots/
  home.png
  cart.png
  checkout.png
  admin-orders.png
```

---

# 🛠️ Tech Stack

### **Frontend**
- Vue.js 3  
- Vite  
- JavaScript (Composition + Options API mix)  
- Vue Router  
- Fetch API / Axios  
- GitHub Pages hosting  

### **Backend**
- Node.js  
- Express.js  
- Native MongoDB driver  
- CORS  
- dotenv  
- Render cloud hosting  

### **Database**
- MongoDB Atlas (Cloud NoSQL)  

---

# 📁 Folder Structure (Frontend)

```
frontend/
│
├── public/
├── src/
│   ├── apiClient.js          # Handles API GET/POST with env support
│   ├── pages/
│   │   ├── CoursePage.vue    # Lesson listing page
│   │   ├── CartPage.vue      # Basket + checkout page
│   │   ├── OrdersPage.vue    # Admin orders page
│   ├── router/index.js        # Vue Router
│   ├── App.vue
│   └── main.js
│
├── project_docs/
│   ├── after-school-api.postman_collection.json
│   ├── mongo_lessons_export.json
│   ├── mongo_orders_export.json
│
├── .env.production            # Contains VITE_API_BASE_URL for Render
├── vite.config.js             # GitHub Pages base path config
└── README.md                  # (this file)
```

---

# ⚙️ Environment Variables

#### 🔹 **Local development (.env)**
```
VITE_API_BASE_URL=http://localhost:4000
```

#### 🔹 **Production (.env.production)**
```
VITE_API_BASE_URL=https://after-school-backend-ri4h.onrender.com
```

Vite will automatically switch between the two based on environment.

---

# 🚀 Running the Project Locally

### 1️⃣ Clone the repositories
```
git clone https://github.com/YUGPATEL17/FULLSTACK_PROJECT_FRONTEND
git clone https://github.com/YUGPATEL17/FULLSTACK_PROJECT_BACKEND
```

---

## 🖥️ Backend Setup (Local)

1. Navigate to backend folder:
```
cd backend
```

2. Install dependencies:
```
npm install
```

3. Add `.env` file:
```
MONGO_URI=your_mongo_connection_string
DB_NAME=afterSchoolDB
PORT=4000
```

4. Start backend:
```
node server.js
```

5. Seed lessons (only once):
Open in browser  
👉 http://localhost:4000/api/courses/import

---

## 💻 Frontend Setup (Local)

1. Navigate to frontend:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Run Vite dev server:
```
npm run dev
```

Frontend runs at:  
👉 http://localhost:5173  

---

# 🌍 Deployment

## 🚀 Backend Deployment (Render)
Backend runs on:
```
https://after-school-backend-ri4h.onrender.com
```

Render Environment Variables:
```
MONGO_URI=<Atlas string>
DB_NAME=afterSchoolDB
PORT=4000
```

---

## 📦 Frontend Deployment (GitHub Pages)

Vite config includes required base path:
```js
export default defineConfig({
  base: "/FULLSTACK_PROJECT_FRONTEND/",
});
```

Deploy steps:
```
npm run build
```

Push the generated `/dist/` folder via GitHub Actions (workflow included).

Live URL:
👉 https://yugpatel17.github.io/FULLSTACK_PROJECT_FRONTEND/

---

# 📡 API Endpoints (Summary)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all lessons (search + sort supported) |
| POST | `/api/courses/import` | Seed lessons into DB |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders |
| GET | `/` | Health check |

### Example: `/api/courses?q=math&sortField=price&sortOrder=asc`

---

# 🧪 Postman Collection  
Located in:
```
project_docs/after-school-api.postman_collection.json
```

Contains:
- GET all lessons  
- POST order  
- GET all orders  

---

# 🗄️ MongoDB Data Exports  
Located in:
```
project_docs/
  mongo_lessons_export.json
  mongo_orders_export.json
```

These show the final state of your database.

---

# ✨ Summary

This project demonstrates:

✔ Full-stack development  
✔ RESTful API design  
✔ Cloud database integration  
✔ Vue.js component architecture  
✔ Form validation  
✔ Deployment on Render + GitHub Pages  
✔ Professional documentation  

This README contains all information required for marking and future reference.

---

# 👨‍💻 Author  
**Yug Patel**  
BSc Computer Science  
Middlesex University London  

---

## ⭐ Summary

This frontend provides a smooth user experience, connects cleanly to a cloud backend, and demonstrates modern web development practices using Vue 3, modular routing, environment configuration, and production deployment.