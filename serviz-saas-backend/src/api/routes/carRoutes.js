const express = require("express");
const carController = require("../controllers/carController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/cars", authenticate, addUserToReq, carController.getCars);
router.get("/cars/:id", authenticate, addUserToReq, carController.getCarById);

module.exports = router;
