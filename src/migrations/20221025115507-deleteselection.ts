'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.removeColumn('products', 'selection')
  },

  async down (queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.addColumn('products', 'selection',{
      type: Sequelize.STRING(10),
      defaultValue:"true",
    })
  }
};
