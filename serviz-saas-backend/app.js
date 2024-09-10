const express = require("express");
const authRoutes = require("./src/api/routes/authRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use auth routes
app.use("/api/auth", authRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
