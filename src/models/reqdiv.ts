'use strict';
import { Model} from 'sequelize';

interface reqDivAttributes {
  id:  number,
  divKey: string,
  value: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class reqDiv extends Model <reqDivAttributes> 
  implements reqDivAttributes {
    id!:  number;
    divKey!: string;
    value!: number
  
  static associate(models: any) {
    // define association here
  }
}

  
  reqDiv.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    divKey: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reqDiv',
  });
  return reqDiv;
};