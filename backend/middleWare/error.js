const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    // Set default statusCode and message if not already set
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB Id error for product
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        let message = "Duplicate key error";  // Default message
        
        if (err.keyValue) {
            message = `Duplicate ${Object.keys(err.keyValue)} entered`;  // Only use Object.keys() if err.keyValue is valid
        }
        
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400); // Bad request (400)
    }

    // Send error response to the user
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
