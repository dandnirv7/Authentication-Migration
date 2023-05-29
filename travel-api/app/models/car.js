"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(Location, {
        foreignKey: "location_id",
        as: "location",
      });
    }
  }
  Car.init(
    {
      car_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      regristration_number: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      color: DataTypes.ENUM,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
