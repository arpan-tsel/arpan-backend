'use strict';
import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface:QueryInterface, Sequelize:any) {
    enum projectsStatus {
      BA = "BA",
      DONE = "DONE",
      InProgress = "In Progress",
      OPR_BA = "OPR BA"
    }
  
    enum projectsType_nodin{
      RFS = "RFS",
      RFI = "RFI"
    }
  
    enum projectsDev_effort{
      Standard = "Standard",
      Normal = "Normal"
    }
  
    enum projectsProject_type{
      BAU = "BAU",
      Project = "Project"
    }


   await queryInterface.createTable('projects', {
      id_project: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      no_nodin_rfsrfi: {
        allowNull: false,
        unique: "unique_tag",
        type: Sequelize.STRING(30)
      },
      date_nodin_rfsrfi: {
        type: Sequelize.DATEONLY
      },
      subject_nodin_rfsrfi: {
        type: Sequelize.STRING(300)
      },
      status: {
        type: Sequelize.ENUM(...Object.values(projectsStatus))
      },
      detail_status: {
        type: Sequelize.STRING(30)
      },
      start_date_testing: {
        type: Sequelize.DATEONLY
      },
      end_date_testing: {
        type: Sequelize.DATEONLY
      },
      no_nodin_rfcitr: {
        type: Sequelize.STRING(50)
      },
      date_nodin_rfcitr: {
        type: Sequelize.DATEONLY
      },
      subject_nodin_rfcitr: {
        type: Sequelize.STRING(300)
      },
      aging_from_nodin: {
        type: Sequelize.INTEGER
      },
      aging_from_testing: {
        type: Sequelize.INTEGER
      },
      title_dev: {
        type: Sequelize.STRING(100)
      },
      pic_dev: {
        type: Sequelize.STRING(100)
      },
      notes_testing: {
        type: Sequelize.STRING(1500)
      },
      testcase_amt: {
        type: Sequelize.INTEGER
      },
      type_nodin: {
        type: Sequelize.ENUM(...Object.values(projectsType_nodin))
      },
      no_nodin_bo: {
        type: Sequelize.STRING(600)
      },
      subject_nodin_bo: {
        type: Sequelize.STRING(300)
      },
      date_nodin_bo: {
        type: Sequelize.DATEONLY
      },
      subdir_bo: {
        type: Sequelize.STRING(100)
      },
      title_bo: {
        type: Sequelize.STRING(100)
      },
      pic_bo: {
        type: Sequelize.STRING(50)
      },
      dev_effort: {
        type: Sequelize.ENUM(...Object.values(projectsDev_effort))
      },
      project_type: {
        type: Sequelize.ENUM(...Object.values(projectsProject_type))
      },
      services: {
        type: Sequelize.STRING(50)
      },
      brand: {
        type: Sequelize.STRING(50)
      },
      pic_tester_1: {
        type: Sequelize.STRING(50)
      },
      pic_tester_2: {
        type: Sequelize.STRING(50)
      },
      pic_tester_3: {
        type: Sequelize.STRING(50)
      },
      pic_tester_4: {
        type: Sequelize.STRING(50)
      },
      pic_tester_5: {
        type: Sequelize.STRING(50)
      },
      testing_progress: {
        type: Sequelize.STRING(200)
      },
      selection: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
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
        unique_tag: {
            customIndex: true,
            fields: ['no_nodin_rfsrfi']
        }
      }
    });
  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
   await queryInterface.dropTable('projects');
  }
};