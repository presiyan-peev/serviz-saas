const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      // e.g., User.hasMany(models.Order)
    }

    // Instance method to verify password
    async verifyPassword(password) {
      return bcrypt.compare(password, this.password);
    }

    // Class method to hash password
    static async hashPassword(password) {
      return bcrypt.hash(password, 10);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [3, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 100],
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "mechanic", "manager"),
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "id",
        },
      },
      lastLogin: {
        type: DataTypes.DATE,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
      paranoid: true, // Enables soft deletes
      hooks: {
        beforeCreate: async (user) => {
          user.password = await User.hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await User.hashPassword(user.password);
          }
        },
      },
      scopes: {
        activeUsers: {
          where: { isActive: true },
        },
      },
    }
  );

  return User;
};
