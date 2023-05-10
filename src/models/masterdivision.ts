'use strict';
import { Model} from 'sequelize';

interface masterDivisionAttributes {
  id:  number,
  devTitle: string,
  division: string,
  department: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class masterDivision extends Model<masterDivisionAttributes> 
    implements masterDivisionAttributes {
      id!:  number;
      devTitle!: string;
      division!: string;
      department!: string
    
    static associate(models: any) {
      // define association here
    }
  }
  

  masterDivision.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    devTitle: DataTypes.STRING,
    division: DataTypes.STRING,
    department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masterDivision',
  });
  return masterDivision;
};