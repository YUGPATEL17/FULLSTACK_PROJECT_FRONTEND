# 🎓 After School Club – Frontend (Vue.js)

This repository contains the **frontend application** for the After School Club booking system.  
It provides a clean, responsive interface where students can browse lessons, add them to a basket, and place an order.  
The application communicates with a Node.js + Express backend hosted on Render.

---

## 🌐 Live Website (GitHub Pages)

👉 **https://yugpatel17.github.io/FULLSTACK_PROJECT_FRONTEND/**

---

## 🖥️ Backend API (Hosted on Render)

👉 **Backend Repository:**  
https://github.com/YUGPATEL17/FULLSTACK_PROJECT_BACKEND

👉 **Live Backend API URL:**  
https://after-school-backend-ri4h.onrender.com

All API calls in the frontend are routed through this base URL using environment variables.

---

## 🚀 Features

### 🎒 Student / User Features
- View all available lessons  
- Search lessons by title, location, description, or even numeric filters (price/spaces)  
- Sort lessons by:
  - Title  
  - Location  
  - Price  
  - Spaces left  
- Add lessons to a cart  
- Adjust lesson quantities  
- Automatic space management  
- Checkout with name + phone validation  
- Live notification after placing an order  

### 🧑‍🏫 Admin Features
- View all placed orders  
- See customer name & phone  
- Review ordered items with quantities and totals  
- Orders sorted by date (latest first)

---

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3**
- **Vite**
- **Vue Router**
- **JavaScript (ES6)**
- **Custom CSS**
- **GitHub Pages Deployment**

### Communication Layer
- Fetch API  
- Environment-based API URL  
- apiClient.js helper for GET/POST

---

## 📁 Project Structure

```
frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── CoursePage.vue
│   │   ├── CartPage.vue
│   │   ├── OrdersPage.vue
│   ├── router/
│   ├── apiClient.js
│   └── main.js
│
├── project_docs/
│   ├── after-school-api.postman_collection.json
│   ├── lessons.json
│   └── orders.json
│
├── .env.production
├── vite.config.js
└── README.md
```

---

## ⚙️ Environment Variables

The frontend automatically switches between **local** and **Render** backend using:

```
VITE_API_BASE_URL="https://after-school-backend-ri4h.onrender.com"
```

Local fallback also works when running with `npm run dev`.

---

## 🧩 API Integration

The frontend uses a simple helper:

```
src/apiClient.js
```

This wraps GET and POST calls and uses the API base URL from `.env.production`.

---

## ▶️ Running the Frontend Locally

### 1. Install dependencies
```
npm install
```

### 2. Start development server
```
npm run dev
```

App will run at:
```
http://localhost:5173
```

---

## 🚢 Deployment (GitHub Pages)

The project is deployed using:
```
npm run build
```

Followed by GitHub Actions workflow for automatic deployment.

The final build is served from:
```
FULLSTACK_PROJECT_FRONTEND/dist/
```

---

## 📚 Documentation Included

Inside `/project_docs/` you will find:

- ✔ Full Postman API collection  
- ✔ Exported MongoDB lessons data  
- ✔ Exported MongoDB orders data  

These help examiners understand and test the project easily.

---

## 👨‍💻 Author

**Yug Patel**  
BSc  Computer Science  
Middlesex University London  

---

## ⭐ Summary

This frontend provides a smooth user experience, connects cleanly to a cloud backend, and demonstrates modern web development practices using Vue 3, modular routing, environment configuration, and production deployment.
