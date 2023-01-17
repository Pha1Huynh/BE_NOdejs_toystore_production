"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Toys, {
        foreignKey: "toyId",
        targetKey: "id",
        as: "toyData",
      });
      Cart.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      toyId: DataTypes.INTEGER,
      cartStatusId: DataTypes.STRING,
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
      freezeTableName: true,
    }
  );
  return Cart;
};
