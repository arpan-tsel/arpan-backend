'use strict';
import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.addColumn('linechartdepts', 'division', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.removeColumn('linechartdepts', 'division')
  }
};
