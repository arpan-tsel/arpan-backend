'use strict';
import { Model } from 'sequelize';

interface projectAttributes {
  id_project: number,
  no_nodin_rfsrfi: string,
  date_nodin_rfsrfi: Date,
  subject_nodin_rfsrfi: string,
  status: Enumerator,
  detail_status: string,
  start_date_testing: Date,
  end_date_testing: Date,
  no_nodin_rfcitr: string,
  date_nodin_rfcitr: Date,
  subject_nodin_rfcitr: string,
  aging_from_nodin: number,
  aging_from_testing: number,
  title_dev: string,
  pic_dev: string,
  divisi: string,
  notes_testing: Text,
  testcase_amt: number,
  type_nodin: Enumerator,
  no_nodin_bo: Text,
  subject_nodin_bo: string,
  date_nodin_bo: Date,
  subdir_bo: string,
  title_bo: string,
  pic_bo: string,
  dev_effort: Enumerator,
  project_type: Enumerator,
  services: string,
  brand: string,
  pic_tester_1: string,
  pic_tester_2: string,
  pic_tester_3: string,
  pic_tester_4: string,
  pic_tester_5: string,
  testing_progress: string,
  selection: boolean,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class projects extends Model<projectAttributes>
    implements projectAttributes {
    id_project!: number;
    no_nodin_rfsrfi!: string;
    date_nodin_rfsrfi!: Date;
    subject_nodin_rfsrfi!: string;
    status!: Enumerator;
    detail_status!: string;
    start_date_testing!: Date;
    end_date_testing!: Date;
    no_nodin_rfcitr!: string;
    date_nodin_rfcitr!: Date;
    subject_nodin_rfcitr!: string;
    aging_from_nodin!: number;
    aging_from_testing!: number;
    title_dev!: string;
    pic_dev!: string;
    divisi!: string;
    notes_testing!: Text;
    testcase_amt!: number;
    type_nodin!: Enumerator;
    no_nodin_bo!: Text;
    subject_nodin_bo!: string;
    date_nodin_bo!: Date;
    subdir_bo!: string;
    title_bo!: string;
    pic_bo!: string;
    dev_effort!: Enumerator;
    project_type!: Enumerator;
    services!: string;
    brand!: string;
    pic_tester_1!: string;
    pic_tester_2!: string;
    pic_tester_3!: string;
    pic_tester_4!: string;
    pic_tester_5!: string;
    testing_progress!: string;
    selection!: boolean;

    static associate(models: any) {
      // define association here
    }
  }

  enum projectsStatus {
    BA = "BA",
    DONE = "DONE",
    InProgress = "In Progress",
    OPR_BA = "OPR BA",
    OnProgress = "ON PROGRESS"
  }

  enum projectsType_nodin {
    RFS = "RFS",
    RFI = "RFI"
  }

  enum projectsDev_effort {
    Standard = "Standard",
    Normal = "Normal"
  }

  enum projectsProject_type {
    BAU = "BAU",
    Project = "Project"
  }

  projects.init({
    id_project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    no_nodin_rfsrfi: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    date_nodin_rfsrfi: DataTypes.DATEONLY,
    subject_nodin_rfsrfi: DataTypes.TEXT,
    status: DataTypes.ENUM(...Object.values(projectsStatus)),
    detail_status: DataTypes.STRING(100),
    start_date_testing: DataTypes.DATEONLY,
    end_date_testing: DataTypes.DATEONLY,
    no_nodin_rfcitr: DataTypes.STRING(50),
    date_nodin_rfcitr: DataTypes.DATEONLY,
    subject_nodin_rfcitr: DataTypes.TEXT,
    aging_from_nodin: DataTypes.INTEGER,
    aging_from_testing: DataTypes.INTEGER,
    title_dev: DataTypes.STRING(100),
    pic_dev: DataTypes.STRING(100),
    divisi: DataTypes.STRING(255),
    notes_testing: DataTypes.TEXT,
    testcase_amt: DataTypes.INTEGER,
    type_nodin: DataTypes.ENUM(...Object.values(projectsType_nodin)),
    no_nodin_bo: DataTypes.TEXT,
    subject_nodin_bo: DataTypes.TEXT,
    date_nodin_bo: DataTypes.DATEONLY,
    subdir_bo: DataTypes.TEXT,
    title_bo: DataTypes.TEXT,
    pic_bo: DataTypes.TEXT,
    dev_effort: DataTypes.ENUM(...Object.values(projectsDev_effort)),
    project_type: DataTypes.ENUM(...Object.values(projectsProject_type)),
    services: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    pic_tester_1: DataTypes.STRING(50),
    pic_tester_2: DataTypes.STRING(50),
    pic_tester_3: DataTypes.STRING(50),
    pic_tester_4: DataTypes.STRING(50),
    pic_tester_5: DataTypes.STRING(50),
    testing_progress: DataTypes.STRING(200),
    selection: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
    {
      indexes: [
        {
          unique: true,
          fields: ['date_nodin_rfsrfi']
        }
      ],
      sequelize,
      modelName: 'projects',
    });
  return projects;
};