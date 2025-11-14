# 🚀 GifHub Backend – Production-Ready API

A modern, scalable backend built for **GifHub**, a GIF & Meme discovery platform.  
The API is built using **Node.js**, **Express**, and **MongoDB**, with integrations to the **Tenor GIF API**.

This backend supports:

- GIF Search, Trending, Categories  
- User Authentication (JWT)  
- Favorites System  
- Search History  
- Trending Search Keywords  
- Clean, modular, enterprise-level folder structure  

---

# 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Bearer Token) |
| External API | Tenor GIF API |
| Dev tools | nodemon, dotenv, bcrypt |

---

# 📁 Project Structure (Clean Architecture)

```
gifhub-backend/
│
├── index.js
├── package.json
├── .env
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── gifController.js
│   ├── favoriteController.js
│   ├── searchController.js
│   └── categoryController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Favorite.js
│   ├── SearchHistory.js
│   └── Keyword.js
│
└── routes/
    ├── authRoutes.js
    ├── gifRoutes.js
    ├── favoriteRoutes.js
    ├── searchRoutes.js
    └── categoryRoutes.js
```

---

# ⚙️ Environment Setup

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gifhub
JWT_SECRET=your_secret
TENOR_API_KEY=your_tenor_key
CLIENT_KEY=gifhub_app
```

---

# 🚀 Run the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

**Expected Output**
```
✔ Server running at http://localhost:5000
✔ MongoDB connected
```

---

# 📌 API Documentation (v1)

## 🔐 Authentication API (`/api/v1/auth`)

### **POST /signup**
Registers a new user.

### **POST /login**
Logs in a user and returns JWT.

---

# 🎬 GIF API (`/api/v1/gifs`)

### **GET /trending?page=1&limit=30**
Fetch trending GIFs from Tenor.

### **GET /search?q=keyword&page=1**
Search GIFs by keyword.

---

# ❤️ Favorites API (`/api/v1/favorites`)

| Endpoint | Description |
|---------|-------------|
| GET `/` | Get all favorites |
| POST `/add` | Add GIF to favorites |
| DELETE `/remove/:id` | Remove GIF |

---

# 📝 Search History API (`/api/v1/search`)

### **GET /history**
Returns the user’s latest 20 searches.

### **DELETE /clear**
Clears all search history for the user.

---

# 🔥 Trending Search Keywords API (`/api/v1/search/trending`)

### **GET /trending**
Returns **top 10 keywords**, sorted by popularity.

---

# 🗂️ GIF Categories API (`/api/v1/categories`)

### **GET /**
Get all categories (auto-fetched from Tenor).

---

# 📦 Standard API Response Format

### **Success**
```json
{
  "success": true,
  "message": "GIF fetched successfully",
  "data": { }
}
```

### **Error**
```json
{
  "success": false,
  "message": "Failed to fetch GIF",
  "error": "Request failed with status code 403"
}
```

---

# 🔑 Authentication Notes

All protected routes require:

```http
Authorization: Bearer <token>
```

JWT expires in 7 days.

---

# 📊 Database Schemas Overview

### User
- name  
- email  
- password (hashed)  
- searchHistory[]  
- createdAt  

### Favorite
- userId  
- gifId  
- url  
- title  

### SearchHistory
- userId  
- keyword  
- timestamp  

### Keyword
- keyword  
- count  

---

# 🧪 Testing the API

Use Postman, Thunder Client, or Hoppscotch.

---

# 🛡️ Production Security Checklist

✔ Rate Limiting  
✔ CORS Protection  
✔ Input Validation  
✔ No secrets pushed to Git  
✔ Helmet Middleware  
✔ Hashed Passwords  
✔ JWT Authentication  

---

# 🚀 Deployment Guide

1. Push to GitHub  
2. Add environment variables  
3. Deploy to Render/Railway/Vercel  
4. Start command:

```
npm start
```

---

# 👨‍💻 Author

**Kunal Pal**  
Full-Stack Developer  
GitHub: https://github.com/kunalpal97  
Email: strive007boy@gmail.com
