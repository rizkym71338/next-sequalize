"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ postCategories }) {
      // define association here
      this.belongsToMany(postCategories, {
        through: "postCategoriesRelationship",
        foreignKey: "postId",
        as: "categories",
        timestamps: false,
        onDelete: "NO ACTION",
      });
    }
  }
  posts.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: UUIDV4 },
      title: { type: DataTypes.STRING, allowNull: false, unique: true },
      body: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "posts",
      tableName: "posts",
    }
  );
  return posts;
};
