const express = require("express");
const authRoutes = require("./src/api/routes/authRoutes");
const userRoutes = require("./src/api/routes/userRoutes");
const cookieParser = require("cookie-parser");
const csrfProtection = require("./src/api/middleware/csrfMiddleware");

const app = express();
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
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

// Other routes...

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
