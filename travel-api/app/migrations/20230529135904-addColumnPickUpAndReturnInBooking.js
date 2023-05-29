"use strict";

const { query } = require("express");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Bookings", "pickup_location_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("Bookings", "return_location_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn("Bookings", "pickup_location_id");
    await queryInterface.removeColumn("Bookings", "return_location_id");
  },
};
