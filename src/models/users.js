"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Cart, {
        foreignKey: "userId",
        as: "userData",
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      roleId: DataTypes.STRING,
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      statusAccount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
