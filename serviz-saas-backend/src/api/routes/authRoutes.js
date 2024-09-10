const express = require("express");
const authController = require("../controllers/authController");
// const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", authController.signup);
// router.post("/login", authController.login);
// router.put("/change-password", authenticate, authController.changePassword);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);
// Optional: router.post("/logout", authenticate, authController.logout);

module.exports = router;
