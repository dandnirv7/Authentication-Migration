"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Locations", {
      location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      pickup_location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "location_id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      return_location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "location_id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Locations");
  },
};
