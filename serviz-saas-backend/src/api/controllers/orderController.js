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

exports.deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.user, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrder(
      req.user,
      req.params.id,
      req.body
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderService.createOrder(req.user, req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
