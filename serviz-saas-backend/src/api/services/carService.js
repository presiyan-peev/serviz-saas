const { Car, Tenant, Customer } = require("../../models");

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
  console.log({ includeOptions, whereClause });
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
