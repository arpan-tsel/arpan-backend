'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.addColumn('projects', 'divisi', {
      type: Sequelize.STRING(80)
    });
    await queryInterface.changeColumn('projects', 'notes_testing', {
      type: Sequelize.STRING(2500)
    });
  },

  async down (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.removeColumn('projects', 'divisi')
    await queryInterface.changeColumn('projects', 'notes_testing', {
      type: Sequelize.STRING(1500)
    })
  }
};
