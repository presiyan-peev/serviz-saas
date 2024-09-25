const { Customer, Tenant } = require("../../models");

exports.getCustomers = async (user) => {
  let customers;
  const includeOptions = [
    {
      model: Tenant,
      attributes: ["name"],
      as: "tenant",
    },
  ];

  if (user.role === "admin") {
    customers = await Customer.findAll({
      include: includeOptions,
    });
  } else {
    customers = await Customer.findAll({
      where: { tenantId: user.tenantId },
    });
  }

  return customers;
};

exports.getCustomerById = async (user, customerId) => {
  let customer;
  const includeOptions = [
    {
      model: Tenant,
      attributes: ["name"],
      as: "tenant",
    },
  ];

  if (user.role === "admin") {
    customer = await Customer.findByPk(customerId, {
      include: includeOptions,
    });
  } else {
    customer = await Customer.findOne({
      where: { id: customerId, tenantId: user.tenantId },
    });
  }

  if (!customer) {
    throw new Error("Customer not found", { cause: 404 });
  }

  return customer;
};
