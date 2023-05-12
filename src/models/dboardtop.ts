'use strict';
import { Model } from 'sequelize';

interface dboardtopAttributes {
  id: number,
  rfs: number,
  rfi: number,
  rfc: number,
  itr: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class dboardtop extends Model<dboardtopAttributes>
    implements dboardtopAttributes {
    id!: number;
    rfs!: number;
    rfi!: number;
    rfc!: number;
    itr!: number

    static associate(models: any) {
      // define association here
    }
  }

  dboardtop.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rfs: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rfi: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rfc: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    itr: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'dboardtop',
  });
  return dboardtop;
};