const { Order, User, Tenant, OrderChange } = require("../../models");

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

exports.deleteOrder = async (user, orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }

  if (user.role !== "admin" && order.tenantId !== user.tenantId) {
    throw new Error("Unauthorized", { cause: 403 });
  }

  await OrderChange.create({
    orderId,
    userId: user.id,
    changeType: "DELETE",
    changes: JSON.stringify(order),
  });

  await order.destroy();
};

exports.updateOrder = async (user, orderId, updateData) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }

  if (user.role !== "admin" && order.tenantId !== user.tenantId) {
    throw new Error("Order not found", { cause: 404 });
  }

  const oldData = JSON.parse(JSON.stringify(order));
  await order.update(updateData);
  await OrderChange.create({
    orderId,
    userId: user.id,
    changeType: "PATCH",
    changes: JSON.stringify({ old: oldData, new: order }),
  });
  return order;
};

exports.createOrder = async (user, orderData) => {
  if (user.role === "admin") {
    throw new Error("Admins cannot create orders", { cause: 403 });
  }

  const newOrder = await Order.create({
    ...orderData,
    userId: user.id,
    tenantId: user.tenantId,
  });

  return newOrder;
};
