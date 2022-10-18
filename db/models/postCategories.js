"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class postCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ posts }) {
      // define association here
      this.belongsToMany(posts, {
        through: "postCategoriesRelationship",
        foreignKey: "categoryId",
        as: "posts",
        timestamps: false,
      });
    }
    // Hide original Id
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  postCategories.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: UUIDV4 },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "postCategories",
      tableName: "postCategories",
    }
  );
  return postCategories;
};
