// Modules
const express = require("express");

// Controllers
const { register, login, logout, getMe } = require("../controllers/auth.controller");

// Middlewares
const protect = require("../middlewares/auth.middleware");

const authRouter = express.Router();

// Route to register new user
authRouter.post("/register", register);
// Route to login user
authRouter.post("/login", login);
// Route to logout user (clear cookies section)
authRouter.delete("/logout", logout);
// Route to auto login
authRouter.get("/me", protect, getMe);

module.exports = authRouter;