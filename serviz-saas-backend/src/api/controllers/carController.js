const carService = require("../services/carService");

exports.getCars = async (req, res, next) => {
  try {
    const include = req.query.include ? req.query.include.split(",") : [];
    const cars = await carService.getCars(req.user, include);
    res.json(cars);
  } catch (error) {
    console.log("Failed to get cars");
    next(error);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const include = req.query.include ? req.query.include.split(",") : [];
    const car = await carService.getCarById(req.user, id, include);
    res.json(car);
  } catch (error) {
    console.log("Failed to get car by id");
    next(error);
  }
};
