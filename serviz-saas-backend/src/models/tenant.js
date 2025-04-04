const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Tenant extends Model {
    static associate(models) {
      // Define associations here
      // e.g., Tenant.hasMany(models.User)
      Tenant.hasMany(models.User, { foreignKey: "tenantId" });
      Tenant.hasMany(models.Customer, { foreignKey: "tenantId" });
      Tenant.hasMany(models.Car, { foreignKey: "tenantId" });
      Tenant.hasMany(models.Order, { foreignKey: "tenantId" }); // Add this line
    }
  }

  Tenant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // Add other relevant fields here, for example:
      // domain: {
      //   type: DataTypes.STRING,
      //   unique: true,
      // },
      // plan: {
      //   type: DataTypes.ENUM("basic", "premium", "enterprise"),
      //   allowNull: false,
      //   defaultValue: "basic",
      // },
      // isActive: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: true,
      // },
    },
    {
      sequelize,
      modelName: "Tenant",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Tenant;
};
