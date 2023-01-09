"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Toys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Toys.belongsTo(models.Allcodes, {
        foreignKey: "toyTypeId",
        targetKey: "keyMap",
        as: "toyTypeData",
      });
    }
  }
  Toys.init(
    {
      name: DataTypes.STRING,
      toyTypeId: DataTypes.STRING,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      length: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      toyInfo: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      contentHTML: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Toys",
    }
  );
  return Toys;
};
