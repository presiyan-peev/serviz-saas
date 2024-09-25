const express = require("express");
const authRoutes = require("./src/api/routes/authRoutes");
const userRoutes = require("./src/api/routes/userRoutes");
const customerRoutes = require("./src/api/routes/customerRoutes");
const carRoutes = require("./src/api/routes/carRoutes");
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
app.use((req, res, next) => {
  console.log("Received request", req.method, req.url, req.body);
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", customerRoutes);
app.use("/api", carRoutes);
// Other routes...

// Basic error handling
app.use((err, req, res, next) => {
  console.log("Error Stack");
  console.error(err.stack);
  if (err.cause) {
    return res
      .status(err.cause)
      .json({ error: err.message, status: err.cause });
  }
  res.status(500).send("Something broke!");
});

module.exports = app;
