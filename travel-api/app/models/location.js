"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(Car, {
        foreignKey: "location_id",
        as: "cars",
      });

      Location.hasOne(Booking, {
        foreignKey: "location_id",
        as: "booking",
      });
    }
  }
  Location.init(
    {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      pickup_location_id: DataTypes.INTEGER,
      return_location_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
