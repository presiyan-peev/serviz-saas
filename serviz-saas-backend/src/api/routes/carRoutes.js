const express = require("express");
const carController = require("../controllers/carController");
const { authenticate, addUserToReq } = require("../middleware/authMiddleware");
const {
  validateCarInput,
  validateCarUpdateInput,
  validateBulkCarInput,
} = require("../middleware/carMiddleware");
const router = express.Router();

router.get("/cars", authenticate, addUserToReq, carController.getCars);
router.get("/cars/:id", authenticate, addUserToReq, carController.getCarById);
router.post(
  "/cars",
  authenticate,
  addUserToReq,
  validateCarInput,
  carController.createCar
);
router.post(
  "/cars/bulk",
  authenticate,
  addUserToReq,
  validateBulkCarInput,
  carController.createBulkCars
);

router.patch(
  "/cars/:id",
  authenticate,
  addUserToReq,
  validateCarUpdateInput,
  carController.updateCar
);

router.delete("/cars/:id", authenticate, addUserToReq, carController.deleteCar);

module.exports = router;
