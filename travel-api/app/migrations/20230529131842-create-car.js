"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      car_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "location_id",
        },
        onUpdate: "RESTRICT",
        onDelete: "CASCADE",
      },
      regristration_number: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.ENUM("Putih", "Hitam", "Abu-abu"),
      },
      year: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Cars");
  },
};
