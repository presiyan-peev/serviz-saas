const bcrypt = require("bcryptjs");
const { User, Tenant } = require("../../models"); // Import models from index.js
const { generateToken } = require("../../utils/jwtUtils");
const { sequelize } = require("../../models"); // Import sequelize instance

exports.signup = async (username, email, password, tenantName) => {
  // Start a transaction to ensure data consistency
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // Create a new tenant
    const tenant = await Tenant.create({ name: tenantName }, { transaction });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and associate with the tenant
    const user = await User.create(
      {
        username,
        email,
        password: hashedPassword,
        tenantId: tenant.id,
        role: "admin", // Assuming the first user of a tenant is an admin
      },
      { transaction }
    );

    // If everything is successful, commit the transaction
    await transaction.commit();

    // Generate and return the token
    return generateToken(user.id, tenant.id);
  } catch (error) {
    // If there's an error, rollback the transaction
    if (transaction) await transaction.rollback();
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Implement other auth methods (login, changePassword, etc.)
