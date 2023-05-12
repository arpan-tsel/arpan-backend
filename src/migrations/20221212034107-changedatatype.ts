'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('projects', 'notes_testing', {
      type: Sequelize.TEXT
    });
    await queryInterface.changeColumn('projects', 'no_nodin_bo', {
      type: Sequelize.TEXT
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('projects', 'notes_testing', {
      type: Sequelize.STRING(2500)
    });
    await queryInterface.changeColumn('projects', 'no_nodin_bo', {
      type: Sequelize.STRING(600)
    });
  }
};
