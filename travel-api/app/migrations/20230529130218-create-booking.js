"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_id",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      pickup_location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_id",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      return_location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "car_id",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
