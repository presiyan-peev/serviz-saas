const { Car, Tenant, Customer } = require("../../models");
const { Op } = require("sequelize");

exports.getCars = async (user, include = []) => {
  let whereClause = {};
  let includeOptions = [
    {
      model: Tenant,
      attributes: ["name"],
      as: "tenant",
    },
  ];
  console.log({ user: user.role });
  if (user.role !== "admin") {
    whereClause.tenantId = user.tenantId;
  }

  if (include.includes("owner")) {
    includeOptions.push({
      model: Customer,
      attributes: ["name"],
      as: "owner",
    });
  }

  const cars = await Car.findAll({
    where: whereClause,
    include: includeOptions,
  });

  return cars;
};

exports.getCarById = async (user, carId, include = []) => {
  let whereClause = { id: carId };
  let includeOptions = [
    {
      model: Tenant,
      attributes: ["name"],
      as: "tenant",
    },
  ];

  if (user.role !== "admin") {
    whereClause.tenantId = user.tenantId;
  }

  if (include.includes("owner")) {
    includeOptions.push({
      model: Customer,
      attributes: ["name"],
      as: "owner",
    });
  }

  const car = await Car.findOne({
    where: whereClause,
    include: includeOptions,
  });

  if (!car) {
    throw new Error("Car not found", { cause: 404 });
  }

  return car;
};

exports.createCar = async (user, carData) => {
  if (user.role === "admin") {
    if (!carData.tenantId) {
      throw new Error("TenantId is required for admin users", { cause: 400 });
    }
  } else {
    if (carData.tenantId && carData.tenantId !== user.tenantId) {
      throw new Error("Invalid tenantId", { cause: 403 });
    }
    carData.tenantId = user.tenantId;
  }

  const car = await Car.create(carData);
  return car;
};

exports.createBulkCars = async (user, carsData) => {
  const result = {
    status: "success",
    summary: {
      total: carsData.length,
      successful: 0,
      failed: 0,
    },
    successful: [],
    failed: [],
  };

  for (let i = 0; i < carsData.length; i++) {
    try {
      if (user.role !== "admin") {
        carsData[i].tenantId = user.tenantId;
      }
      const car = await Car.create(carsData[i]);
      result.successful.push(car);
      result.summary.successful++;
    } catch (error) {
      result.failed.push({
        index: i,
        error: {
          code: error.name,
          message: error.message,
        },
      });
      result.summary.failed++;
    }
  }

  if (result.summary.failed > 0 && result.summary.successful > 0) {
    result.status = "partial_success";
  } else if (result.summary.failed === result.summary.total) {
    result.status = "failed";
  }

  return result;
};

exports.updateCar = async (user, carId, carData) => {
  const car = await Car.findByPk(carId);

  if (!car) {
    throw new Error("Car not found", { cause: 404 });
  }

  if (user.role !== "admin" && car.tenantId !== user.tenantId) {
    throw new Error("Car not found", { cause: 404 });
  }

  // Ensure tenantId cannot be modified
  delete carData.tenantId;

  const updatedCar = await car.update(carData);
  return updatedCar;
};

exports.deleteCar = async (user, carId) => {
  const car = await Car.findByPk(carId);

  if (!car) {
    throw new Error("Car not found", { cause: 404 });
  }

  if (user.role !== "admin" && car.tenantId !== user.tenantId) {
    throw new Error("Car not found", { cause: 404 });
  }

  await car.destroy();
};
