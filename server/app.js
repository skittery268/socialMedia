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

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);

    connectDB();
})