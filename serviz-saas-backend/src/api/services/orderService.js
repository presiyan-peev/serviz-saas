const { Order, User, Tenant } = require("../../models");
const { Op } = require("sequelize");

exports.getOrders = async (user, offset, limit) => {
  const queryOptions = {
    include: [
      {
        model: User,
        attributes: ["id", "username", "email"],
      },
      {
        model: Tenant,
        attributes: ["id", "name"],
      },
    ],
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  };

  // If the user is not an admin, restrict to their tenant
  if (user.role !== "admin") {
    queryOptions.where = { tenantId: user.tenantId };
  }

  const { count, rows } = await Order.findAndCountAll(queryOptions);

  return {
    totalItems: count,
    orders: rows,
    currentPage: Math.floor(offset / limit) + 1,
    totalPages: Math.ceil(count / limit),
  };
};

exports.getOrderById = async (user, orderId) => {
  const queryOptions = {
    include: [
      {
        model: User,
        attributes: ["id", "username", "email"],
      },
      {
        model: Tenant,
        attributes: ["id", "name"],
      },
    ],
    where: { id: orderId },
  };

  // If the user is not an admin, restrict to their tenant
  if (user.role !== "admin") {
    queryOptions.where.tenantId = user.tenantId;
  }

  const order = await Order.findOne(queryOptions);

  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }

  // If the user is not an admin and the order is not from their tenant, return null
  if (user.role !== "admin" && order.tenantId !== user.tenantId) {
    throw new Error("Order not found", { cause: 404 });
  }

  return order;
};
