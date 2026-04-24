// Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Controllers
const globalErrorHandler = require("./controllers/error.controller");

// Configs
const connectDB = require("./config/mongo.config");

// Routers
const authRouter = require("./routers/auth.router");
const postRouter = require("./routers/post.router");
const commentRouter = require("./routers/comment.router");
const likeRouter = require("./routers/like.router");

const app = express();

// Helper middleware functions
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser({
    origin: "http://localhost:5173",
    credentials: true
}))

// Routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

// Global Error Handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);

    connectDB();
})