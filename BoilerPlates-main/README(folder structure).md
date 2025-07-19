
# 🧠 Job-Sky Backend

A simple Node.js + Express backend for handling **authentication** and **user management** for a job portal. Supports role-based users: `user`, `recruiter`.

---

## 🚀 Features

- JWT-based authentication (register/login)
- MongoDB with Mongoose
- User roles: user, recruiter
- Error handling middleware
- Modular folder structure

---

## 📦 Folder Structure

```
BoilerPlates-main/
│
├── server.js                 # Entry point
├── app.js                    # Express app configuration
├── package.json              # Dependencies
├── .env.example              # Sample environment variables
│
└── src/
├── config/
│   └── env.config.js
├── controllers/
│   ├── auth.controller.js
│   ├── category.controller.js       ✅
│   └── subcategory.controller.js    ✅
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── input.validation.js
├── models/
│   ├── user.model.js
│   ├── category.model.js            ✅
│   └── subcategory.model.js         ✅
├── routes/
│   ├── auth.route.js
│   ├── category.routes.js           ✅
│   └── subcategory.routes.js        ✅
├── services/
│   ├── auth.services.js
│   └── category.services.js         ✅ (optional)
└── db/
    └── db.js

```

---

## 🔧 Setup

1. **Clone repo**
```bash
git clone <repo-url>
cd BoilerPlates-main
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/job-sky
JWT_SECRET=your_jwt_secret
```

4. **Run the server**
```bash
npm run dev
```

---

## 🔐 API Endpoints

### ✅ Register

`POST /api/auth/signup`

```json
{
  "name": "Samad",
  "email": "samad@example.com",
  "password": "123456",
  "confirmPassword": "123456",
  "role": "recruiter" // or "user"
}
```

### 🔓 Login

`POST /api/auth/login`

```json
{
  "email": "samad@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "Login successful",
  "user": {
    "id": "64...",
    "role": "recruiter"
  },
  "token": "jwt-token..."
}
```

---

## 🧠 Notes

- Default role is `"user"` unless `"recruiter"` is passed.
- Passwords are hashed using bcrypt.
- JWT token is returned on successful login.
- Extend `user.model.js` to include recruiter info like `company`, etc.

---

## 📧 Contact

For onboarding or help, contact the maintainer.
