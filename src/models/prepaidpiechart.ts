'use strict';
import { Model} from 'sequelize';

interface prepaidPieChartAttributes {
  id:  number,
  dept: string,
  value: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class prepaidPieChart extends Model <prepaidPieChartAttributes> 
  implements prepaidPieChartAttributes{
    id!:  number;
    dept!: string;
    value!: number
    static associate(models:any) {
      // define association here
    }
  }
  prepaidPieChart.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dept: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'prepaidPieChart',
  });
  return prepaidPieChart;
};