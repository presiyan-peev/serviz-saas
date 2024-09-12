const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/users", authenticate, addUserToReq, userController.createUser);

module.exports = router;
