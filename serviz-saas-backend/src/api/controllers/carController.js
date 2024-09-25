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

exports.createCar = async (req, res, next) => {
  try {
    const car = await carService.createCar(req.user, req.body);
    res.status(201).json(car);
  } catch (error) {
    console.log("Failed to create car");
    next(error);
  }
};

exports.createBulkCars = async (req, res, next) => {
  try {
    const result = await carService.createBulkCars(req.user, req.body.items);
    res.status(200).json(result);
  } catch (error) {
    console.log("Failed to create cars in bulk");
    next(error);
  }
};
