const express = require("express");
const { register, login, logout, getMe } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);
authRouter.get("/me", protect, getMe);

module.exports = authRouter;