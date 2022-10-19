"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ roles }) {
      // define association here
      this.belongsTo(roles, {
        foreignKey: "roleId",
        as: "roles",
      });
    }
    // Hide original Id
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  users.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: UUIDV4 },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
    }
  );
  return users;
};
