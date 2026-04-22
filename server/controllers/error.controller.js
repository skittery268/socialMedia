// Function to send errors for user
const sendErrorProd = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        status,
        message: err.message
    })
}

// Function to send errors for developer
const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        status,
        message: err.message,
        stack: err.stack,
        err
    })
}

// Controller to global error handling
const globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_MODE === "dev") {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
}

module.exports = globalErrorHandler;