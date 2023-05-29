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
    await queryInterface.removeColumn("Locations", "pickup_location_id");
    await queryInterface.removeColumn("Locations", "return_location_id");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.addColumn("Locations", "pickup_location_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Locations", "return_location_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
