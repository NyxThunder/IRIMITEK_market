const asyncWrapper = require("../middleWare/asyncWrapper");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

// Middleware to authenticate users
exports.isAuthentictedUser = asyncWrapper(async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; 

    // If no token is found
    if (!token) {
        return next(new ErrorHandler("Unauthorized: Please login to access this resource", 401));
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user and check existence
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return next(new ErrorHandler("User not found. Please login again.", 401));
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token. Please login again.", 401));
    }
});

// Middleware to authorize user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Access denied. Role '${req.user?.role || "Unknown"}' is not allowed.`, 403)
            );
        }
        next();
    };
};
