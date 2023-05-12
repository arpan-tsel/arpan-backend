'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('linechartdeparts', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }),
      await queryInterface.changeColumn('linechartdeparts', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      })

  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('linechartdeparts', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    }),
      await queryInterface.changeColumn('linechartdeparts', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE
      })
  }
};
