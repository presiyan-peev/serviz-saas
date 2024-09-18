const { User, Tenant, ActivityLog } = require("../../models");
const { Op } = require("sequelize");

exports.getUsers = async (requestingUser, { page, limit, sort, filter }) => {
  const offset = (page - 1) * limit;

  let whereClause = {};
  if (filter) {
    whereClause = {
      [Op.or]: [
        { username: { [Op.iLike]: `%${filter}%` } },
        { email: { [Op.iLike]: `%${filter}%` } },
      ],
    };
  }

  if (requestingUser.role !== "admin") {
    whereClause.tenantId = requestingUser.tenantId;
  }

  const { rows, count } = await User.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: sort ? [[sort, "ASC"]] : undefined,
    attributes: { exclude: ["password"] },
    include:
      requestingUser.role === "admin"
        ? [{ model: Tenant, attributes: ["name"], as: "tenant" }]
        : [],
  });

  return {
    users: rows,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

exports.getUser = async (requestingUser, userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include:
      requestingUser.role === "admin"
        ? [{ model: Tenant, attributes: ["name"] }]
        : [],
  });

  if (!user) {
    return null;
  }

  if (
    requestingUser.role !== "admin" &&
    user.tenantId !== requestingUser.tenantId
  ) {
    throw new Error("Forbidden");
  }

  return user;
};

// Implement updateUser and deleteUser similarly

exports.logActivity = async (userId, action, details, ipAddress) => {
  await ActivityLog.create({
    userId,
    action,
    details,
    ipAddress,
  });
};

exports.updateUser = async (requestingUser, userId, updateData) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (requestingUser.role === "mechanic" && userId !== requestingUser.id) {
    throw new Error("Forbidden");
  }

  if (
    requestingUser.role === "manager" &&
    user.tenantId !== requestingUser.tenantId
  ) {
    throw new Error("Forbidden");
  }

  delete updateData.password; // Ensure password can't be updated here

  await user.update(updateData);

  await this.logActivity(
    requestingUser.id,
    "UPDATE_USER",
    `Updated user ${userId}`,
    requestingUser.ipAddress
  );

  return user;
};
