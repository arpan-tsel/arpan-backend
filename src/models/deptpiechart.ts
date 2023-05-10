'use strict';
import { Model} from 'sequelize';

interface deptPieChartAttributes{
  id:  number,
  division: string,
  department: string,
  counter: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class deptPieChart extends Model<deptPieChartAttributes> 
  
  implements deptPieChartAttributes{
    id!:  number;
    division!: string;
    department!: string;
    counter!: number
    static associate(models:any) {
      // define association here
    }
  }
  deptPieChart.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    division: DataTypes.STRING,
    department: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    counter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'deptPieChart',
  });
  return deptPieChart;
};