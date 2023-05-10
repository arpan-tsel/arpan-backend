'use strict';
import { Model} from 'sequelize';

interface productAttributes{
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
    notes_testing: string,
    testcase_amt: number,
    type_nodin: Enumerator,
    no_nodin_bo: string,
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
  class products extends Model<productAttributes>
    implements productAttributes{
      
    id_project!:number;
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
    notes_testing!: string;
    testcase_amt!: number;
    type_nodin!: Enumerator;
    no_nodin_bo!: string;
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
    

    static associate(models:any) {
      // define association here
    }
  }

  enum productsStatus {
    BA = "BA",
    DONE = "DONE",
    InProgress = "In Progress",
    OPR_BA = "OPR BA"
  }

  enum productsType_nodin{
    RFS = "RFS",
    RFI = "RFI"
  }

  enum productsDev_effort{
    Standard = "Standard",
    Normal = "Normal"
  }

  enum productsProject_type{
    BAU = "BAU",
    Project = "Project"
  }

  products.init({
    id_project: {type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,},
    no_nodin_rfsrfi: DataTypes.STRING(30),
    date_nodin_rfsrfi: DataTypes.DATEONLY,
    subject_nodin_rfsrfi: DataTypes.STRING(300),
    status: DataTypes.ENUM(...Object.values(productsStatus)),
    detail_status: DataTypes.STRING(30),
    start_date_testing: DataTypes.DATEONLY,
    end_date_testing: DataTypes.DATEONLY,
    no_nodin_rfcitr: DataTypes.STRING(50),
    date_nodin_rfcitr: DataTypes.DATEONLY,
    subject_nodin_rfcitr: DataTypes.STRING(300),
    aging_from_nodin: DataTypes.INTEGER,
    aging_from_testing: DataTypes.INTEGER,
    title_dev: DataTypes.STRING(100),
    pic_dev: DataTypes.STRING(100),
    notes_testing: DataTypes.STRING(1500),
    testcase_amt: DataTypes.INTEGER,
    type_nodin: DataTypes.ENUM(...Object.values(productsType_nodin)),
    no_nodin_bo: DataTypes.STRING(600),
    subject_nodin_bo: DataTypes.STRING(300),
    date_nodin_bo: DataTypes.DATEONLY,
    subdir_bo: DataTypes.STRING(100),
    title_bo: DataTypes.STRING(100),
    pic_bo: DataTypes.STRING(50),
    dev_effort: DataTypes.ENUM(...Object.values(productsDev_effort)),
    project_type: DataTypes.ENUM(...Object.values(productsProject_type)),
    services: DataTypes.STRING(50),
    brand: DataTypes.STRING(50),
    pic_tester_1: DataTypes.STRING(50),
    pic_tester_2: DataTypes.STRING(50),
    pic_tester_3: DataTypes.STRING(50),
    pic_tester_4: DataTypes.STRING(50),
    pic_tester_5: DataTypes.STRING(50),
    testing_progress: DataTypes.STRING(200),
    selection: {type: DataTypes.BOOLEAN, defaultValue:true}
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};