const orderService = require("../services/orderService");
const { getPagination } = require("../utils/pagination");

exports.getOrders = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { offset, limit: paginationLimit } = getPagination(page, limit);
    const orders = await orderService.getOrders(
      req.user,
      offset,
      paginationLimit
    );
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.user, req.params.id);
    if (!order) {
      throw new Error("Order not found", { cause: 404 });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};
