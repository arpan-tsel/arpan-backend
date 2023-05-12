'use strict';
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    enum useraccountsRole {
      admin = 'admin',
      regular = 'regular',
      quality = 'quality'
    }

    await queryInterface.createTable('useraccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(70)
      },
      username: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM(...Object.values(useraccountsRole))
      },
      employee_title: {
        type: Sequelize.STRING(100)
      },
      department: {
        type: Sequelize.STRING(100)
      },
      division: {
        type: Sequelize.STRING(80)
      },
      sub_directorate: {
        type: Sequelize.STRING(100)
      },
      address: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      refreshToken: {
        type: Sequelize.STRING(300)
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
  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('useraccounts');
  }
};