'use strict';
import sequelize from "sequelize";
import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.createTable('dboardtops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rfs: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rfi: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rfc: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      itr: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('dboardtops');
  }
};