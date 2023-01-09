"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcodes.hasMany(models.Toys, {
        foreignKey: "toyTypeId",
        as: "toyTypeData",
      });
    }
  }
  Allcodes.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );
  return Allcodes;
};
