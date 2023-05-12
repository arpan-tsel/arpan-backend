'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('projects', 'title_bo', {
      type: Sequelize.STRING(300)
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('projects', 'title_bo', {
      type: Sequelize.STRING(100)
    });
  }
};
