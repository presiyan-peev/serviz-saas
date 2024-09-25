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

exports.createCustomer = async (user, customerData) => {
  let tenantId = user.tenantId;

  if (user.role === "admin" && customerData.tenantId) {
    tenantId = customerData.tenantId;
  }

  const customer = await Customer.create({
    ...customerData,
    tenantId,
  });

  return customer;
};

exports.updateCustomer = async (user, customerId, updateData) => {
  const customer = await Customer.findByPk(customerId);

  if (!customer) {
    throw new Error("Customer not found", { cause: 404 });
  }

  if (user.role !== "admin" && customer.tenantId !== user.tenantId) {
    throw new Error("Customer not found", { cause: 404 });
  }

  if (user.role !== "admin") {
    delete updateData.tenantId;
    delete updateData.createdAt;
    delete updateData.updatedAt;
  }

  await customer.update(updateData);

  return customer;
};

exports.deleteCustomer = async (user, customerId) => {
  const customer = await Customer.findByPk(customerId);

  if (!customer) {
    throw new Error("Customer not found", { cause: 404 });
  }

  if (user.role !== "admin" && customer.tenantId !== user.tenantId) {
    throw new Error("Customer not found", { cause: 404 });
  }

  if (user.role === "mechanic") {
    throw new Error("Forbidden", { cause: 403 });
  }

  await customer.destroy();
};
