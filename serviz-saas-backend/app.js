const express = require("express");
const authRoutes = require("./src/api/routes/authRoutes");
const userRoutes = require("./src/api/routes/userRoutes");
const customerRoutes = require("./src/api/routes/customerRoutes");
const carRoutes = require("./src/api/routes/carRoutes");
const orderRoutes = require("./src/api/routes/orderRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrfProtection = require("./src/api/middleware/csrfMiddleware");

const app = express();

// Add CORS middleware (put this before other middleware)
app.use(
  cors({
    origin: "http://localhost:3003", // Your frontend URL (from the Referer header)
    credentials: true, // Important if you're sending cookies/authentication
  })
);

app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Apply CSRF protection to all routes
// app.use(csrfProtection);

// Expose CSRF token to client
// app.use((req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

// Use auth routes
app.use((req, res, next) => {
  console.log("Received request", req.method, req.url, req.body);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", customerRoutes);
app.use("/api", carRoutes);
app.use("/api", orderRoutes);
// Other routes...
// Add this at the end of your routes, but before the error handling middleware
app.use((req, res, next) => {
  console.log("Unhandled request:", req.method, req.path);
  res.status(404).send("Not Found");
});
// Basic error handling
app.use((err, req, res, next) => {
  console.log("Error Stack");
  console.error(err.toString());
  console.error(err.stack);
  if (err.cause) {
    return res.status(err.cause).json({
      error: err.message,
      status: err.cause,
      internalCode: err.internalCode,
    });
  }
  res.status(500).send("Something broke!");
});

module.exports = app;
