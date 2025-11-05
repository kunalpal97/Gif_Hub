# 🎬 GifHub Backend

A simple and powerful backend server for **GifHub**, built with **Node.js**, **Express**, and **MongoDB**.  
This backend integrates with the **Tenor GIF API** to fetch trending GIFs, allows user authentication (JWT-based),  
and lets users save or remove their favorite GIFs.

---

## 🚀 Features

- 🔐 **User Authentication** — Signup & Login with JWT tokens  
- 💾 **MongoDB Integration** — Store users and favorite GIFs  
- 🌐 **GIF Fetching** — Get trending GIFs or search for any GIF via **Tenor API**  
- ❤️ **Favorites System** — Add, remove, and view user’s favorite GIFs  
- ⚙️ **Environment Variable Support** via `.env`  
- 🧩 **Modular Code Structure** — Cleanly separated routes, controllers, and models

---

## 🧱 Tech Stack

- **Backend Framework:** Express.js  
- **Database:** MongoDB + Mongoose  
- **Auth:** JSON Web Tokens (JWT)  
- **External API:** [Tenor GIF API](https://tenor.com/gifapi/documentation)  
- **Environment Management:** dotenv
- **Development Tool:** nodemon

---

## 📁 Project Structure

```
gif_hub_backend/
│
├── index.js                # Entry point of the app
├── .env                    # Environment variables
├── package.json
│
├── config/
│   └── db.js               # MongoDB connection setup
│
├── controllers/
│   ├── authController.js   # Handles signup & login
│   ├── gifController.js    # Handles fetching GIFs from Tenor API
│   └── favoriteController.js # Manages user favorites (CRUD)
│
├── middlewares/
│   └── authMiddleware.js   # JWT verification logic
│
├── models/
│   ├── User.js             # User schema (email, password, name)
│   └── Favorite.js         # Favorite GIF schema
│
└── routes/
    ├── authRoutes.js       # Routes for /api/auth
    ├── gifRoutes.js        # Routes for /api/gifs
    └── favoriteRoutes.js   # Routes for /api/favorites
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kunalpal97/gif_hub.git
cd gif_hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mcarhvs.mongodb.net/gif_hub
JWT_SECRET=your_secret_key
TENOR_API_KEY=your_tenor_api_key
CLIENT_KEY=gif_hub_app
```

---

## 🧠 API Documentation

### 🔹 **Auth Routes** (`/api/auth`)

| Method | Endpoint       | Description         | Auth Required |
|--------|----------------|---------------------|----------------|
| POST   | `/signup`      | Register new user   | ❌ |
| POST   | `/login`       | Login and get token | ❌ |

**Signup Example Request:**
```json
{
  "name": "Kunal",
  "email": "Kunal@gmail.com",
  "password": "12345"
}
```

**Login Example Response:**
```json
{
  "success": true,
  "user": {
    "_id": "690901cfdfa713ca5ba723d8",
    "email": "Kunal@gmail.com",
    "name": "Kunal"
  },
  "token": "your_jwt_token_here"
}
```

---

### 🔹 **GIF Routes** (`/api/gifs`)

| Method | Endpoint         | Description                    | Auth Required |
|--------|------------------|--------------------------------|----------------|
| GET    | `/trending`      | Get trending GIFs from Tenor   | ❌ |
| GET    | `/search?q=text` | Search GIFs by keyword         | ❌ |

Example Response:
```json
{
  "success": true,
  "gifs": [
    {
      "id": "abc123",
      "url": "https://media.tenor.com/abc123.gif",
      "title": "funny cat"
    }
  ]
}
```

---

### 🔹 **Favorite Routes** (`/api/favorites`)

| Method | Endpoint       | Description              | Auth Required |
|--------|----------------|--------------------------|----------------|
| POST   | `/add`         | Add GIF to favorites     | ✅ |
| GET    | `/`            | Get user’s favorites     | ✅ |
| DELETE | `/remove/:id`  | Remove GIF from favorites| ✅ |

**Add Favorite Example Request:**
```json
{
  "gifId": "abc123",
  "gifUrl": "https://media.tenor.com/abc123.gif",
  "title": "funny"
}
```

---

## 🛠️ Running the Server

```bash
npm run dev
```

Server starts on:

```
✅ Server running on http://localhost:5000
✅ MongoDB connected
```

---

## 🧩 Key Learnings

- How to connect MongoDB using Mongoose  
- JWT authentication flow (signup → login → protected routes)  
- Using middleware for token verification  
- Fetching data from external APIs (Tenor)  
- Structuring backend projects cleanly and modularly  

---

## 🧑‍💻 Author

**👋 Kunal Pal**  
Backend Developer | Full Stack Enthusiast  
📧 Email: Strive007boy@gmail.com  
🌐 GitHub: [github.com/kunalpal97](https://github.com/kunalpal97)

---
