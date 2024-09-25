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
