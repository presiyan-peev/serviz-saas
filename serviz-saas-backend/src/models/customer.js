const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Customer extends Model {
    static associate(models) {
      // Define associations here
      Customer.hasMany(models.Car, {
        foreignKey: "customerId",
        as: "cars",
      });
      Customer.belongsTo(models.Tenant, {
        foreignKey: "tenantId",
        as: "tenant",
      });
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      facebook: {
        type: DataTypes.STRING, // To store the customer's Facebook profile link
      },
      notes: {
        type: DataTypes.STRING, // To store any additional notes about the customer
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "id",
        },
        // To store the ID of the tenant this customer belongs to
      },
    },
    {
      sequelize,
      modelName: "Customer",
      timestamps: true,
      paranoid: true, // Enables soft deletes
    }
  );

  return Customer;
};
