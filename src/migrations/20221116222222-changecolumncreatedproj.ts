'use strict';

import sequelize from "sequelize";
import { QueryInterface } from "sequelize";

module.exports = {
  async up (queryInterface:QueryInterface, Sequelize:any) {
    enum projectsStatus {
      BA = "BA",
      DONE = "DONE",
      InProgress = "In Progress",
      OPR_BA = "OPR BA",
      OnProgress = "ON PROGRESS"
    }
    await queryInterface.changeColumn('projects', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }),
    await queryInterface.changeColumn('projects', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }),
    await queryInterface.changeColumn('projects', 'status', {
      type: Sequelize.ENUM(...Object.values(projectsStatus))
    })

  },

  async down (queryInterface:QueryInterface, Sequelize:any) {
    enum projectsStatus {
      BA = "BA",
      DONE = "DONE",
      InProgress = "In Progress",
      OPR_BA = "OPR BA"
    }
    await queryInterface.changeColumn('projects', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    }),
    await queryInterface.changeColumn('projects', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    }),
    await queryInterface.changeColumn('projects', 'status', {
      type: Sequelize.ENUM(...Object.values(projectsStatus))
    })
  }
};
