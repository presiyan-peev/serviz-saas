const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/users", authenticate, isAdmin, userController.createUser);

module.exports = router;
