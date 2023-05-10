'use strict';
import sequelize from "sequelize";
import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.createTable('linechartdeparts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      division: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      january: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      february: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      march: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      april: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      may: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      june: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      july: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      august: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      september: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      october: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      november: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      december: {
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
    await queryInterface.dropTable('linechartdeparts');
  }
};