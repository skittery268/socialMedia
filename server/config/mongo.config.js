// Modules
const mongoose = require("mongoose");

// Config to connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Data base connected!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;