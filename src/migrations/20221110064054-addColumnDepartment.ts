'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.addColumn('masterdivisions', 'department', {
      type: Sequelize.STRING
    })
  },

  async down (queryInterface:QueryInterface, Sequelize:any) {
   await queryInterface.removeColumn('masterdivisions', 'department')
  }
};
