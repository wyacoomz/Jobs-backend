# 🧠 Job-Sky Backend

A role-based user management backend for a job portal that supports **users**, **recruiters**, and **admins**. Built with **Node.js**, **Express**, and **MongoDB**, this backend enables secure authentication, role-specific data access, and recruiter profile support.

---

## 📁 Folder Structure

```
job-sky-backend/
├── config/                # DB configuration
│   └── db.js
├── controllers/          # Logic for routes
│   └── auth.controller.js
├── middleware/           # Auth and role-based middlewares
│   └── auth.middleware.js
├── models/               # Mongoose models
│   └── user.model.js
├── routes/               # Express routes
│   └── auth.route.js
├── services/             # Business logic
│   └── auth.services.js
├── .env                  # Environment variables
├── server.js             # Main entry point
└── README.md             # Project documentation
```

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Postman (Testing API)
- dotenv (Environment Config)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/job-sky-backend.git
cd job-sky-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file and add the following:

```
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the server

```bash
npm start
# or with nodemon
npm run dev
```

---

## 👥 Roles

- **User**: Regular job seeker
- **Recruiter**: Can post jobs and manage job seekers
- **Admin**: Can access all users and recruiters

---

## 🔐 Authentication Flow

### ✅ Registration (`POST /api/v1/auth/register`)
```json
{
  "name": "Samad",
  "email": "samad@example.com",
  "password": "123456",
  "confirmPassword": "123456",
  "role": "recruiter" // or "user"
}
```

### ✅ Login (`POST /api/v1/auth/login`)
```json
{
  "email": "samad@example.com",
  "password": "123456"
}
```

### ✅ Protected Routes

Use the token returned from login/registration in Postman headers:

```
Authorization: Bearer <token>
```

---

## 🔎 API Endpoints

### 📌 Public Routes

| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| POST   | `/register`            | Register user/recruiter |
| POST   | `/login`               | Login with email/password |
| POST   | `/login-with-phone`    | Login with OTP (if implemented) |

### 🔐 Protected Routes

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/me`                  | Get logged-in user info        |
| POST   | `/logout`              | Logout user                    |
| GET    | `/users`               | Get all users (role: user)     |
| GET    | `/admins`              | Get all admins                 |
| GET    | `/recruiters`          | Get all recruiters             |

> 🧠 Uses `injectRole(role)` middleware to filter data

---

## 🧠 How Role Routes Work

In `auth.route.js`:

```js
const injectRole = (role) => (req, res, next) => {
  req.role = role;
  next();
};
router.get("/users", injectRole("user"), getUserByRole);
router.get("/admins", injectRole("admin"), getUserByRole);
router.get("/recruiters", injectRole("recruiter"), getUserByRole);
```

In `auth.controller.js`:

```js
export const getUserByRole = async (req, res) => {
  const users = await User.find({ role: req.role });
  res.status(200).json(users);
};
```

---

## 🔐 Security

- Passwords are hashed using **bcrypt**
- JWTs are signed with secret and stored securely
- Role-based access ensures controlled data exposure

---

## 📖 Contributor Notes

If you're contributing:

1. Stick to the folder structure
2. Use ES6+ syntax
3. Keep roles logic consistent
4. Write modular, testable code

---

## 👨‍💻 Author

Made by **Abdul Samad Khan**

[LinkedIn](https://www.linkedin.com/in/abdul-samad-khan-08a925261) • [GitHub](https://github.com/wyacoomz)

---

## 📌 Future Plans

- Recruiter dashboard
- Job posting module
- Admin panel & analytics

---

## 📝 License

This project is licensed for educational and demo purposes.