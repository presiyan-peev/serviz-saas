const customerService = require("../services/customerService");

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getCustomers(req.user);
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(req.user, id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.user, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await customerService.updateCustomer(
      req.user,
      id,
      req.body
    );
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await customerService.deleteCustomer(req.user, id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
