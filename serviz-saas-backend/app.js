const express = require("express");
const authRoutes = require("./src/api/routes/authRoutes");
const cookieParser = require("cookie-parser");
const csrfProtection = require("./src/api/middleware/csrfMiddleware");

const app = express();
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Use auth routes
app.use("/api/auth", authRoutes);

// Apply CSRF protection to all routes that accept user input
app.use("/api", csrfProtection);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
