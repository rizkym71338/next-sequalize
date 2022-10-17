"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      this.hasMany(users, {
        foreignKey: "roleId",
        as: "users",
      });
    }
  }
  roles.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: UUIDV4 },
      rolename: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "roles",
      tableName: "roles",
    }
  );
  return roles;
};
