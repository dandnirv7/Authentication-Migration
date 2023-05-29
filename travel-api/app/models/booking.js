"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Booking.belongsTo(models.Car, {
        foreignKey: "car_id",
        as: "car",
      });

      Booking.belongsTo(models.Location, {
        foreignKey: "pickup_location_id",
        as: "pickup_location",
      });

      Booking.belongsTo(models.Location, {
        foreignKey: "return_location_id",
        as: "return_location",
      });
    }
  }
  Booking.init(
    {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pickup_location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      return_location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
