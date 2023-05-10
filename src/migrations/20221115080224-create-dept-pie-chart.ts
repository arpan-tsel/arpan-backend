'use strict';
import sequelize from "sequelize";
import { QueryInterface } from "sequelize";
module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.createTable('deptPieCharts', {
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
        allowNull: false,
        unique: "unique_tag",
        type: Sequelize.STRING
      },
      counter: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      uniqueKeys: {
        unique_tag:{
          customIndex:true,
          fields: ['department']
        }
      }
    }
    
    );
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('deptPieCharts');
  }
};