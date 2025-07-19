import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { login,
     register,
      logout,
       getMe,
       loginWithPhone,
       getUserByRole
    } from "../controllers/auth.controller.js";
const router = express.Router();

//Role middelware
const injectRole = (role) => (req, res, next) => {
    req.role =role;
    next();
};
router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", isAuthenticated, logout);
router.post("/login-with-phone", loginWithPhone);

// get user by role 
router.get("/users", injectRole("user"), getUserByRole);
router.get("/admins", injectRole("admin"), getUserByRole);
router.get("/recruiters", injectRole("recruiter"), getUserByRole)

export default router;
