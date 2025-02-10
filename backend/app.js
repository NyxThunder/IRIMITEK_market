const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // For handling file uploads
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: "http://188.166.1.85:3000", // Enable CORS for all origins
  credentials: true,  // If you're sending cookies or credentials
}));

// // Proxy Middleware - Redirect `/api` calls to another server
// app.use(
//   "/api/v1",
//   createProxyMiddleware({
//     target: "http://localhost:5000",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api/v1": "", // Remove the '/api/v1' prefix before proxying the request
//     },
//     timeout: 5000,
//     proxyTimeout: 5000,
//   })
// );

// Serve static files (for production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");

app.get("/api/v1/welcome", (req, res) => {
  res.json({ message: "welcome IrmiTEK server!" });
});

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Error Middleware (should be after all routes)
app.use(errorMiddleware);

module.exports = app;
