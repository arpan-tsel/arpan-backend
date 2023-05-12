'use strict';
import { Model } from 'sequelize';

interface linechartdepartAttributes {
  id: number,
  division: string,
  department: string,
  january: number,
  february: number,
  march: number,
  april: number,
  may: number,
  june: number,
  july: number,
  august: number,
  september: number,
  october: number,
  november: number,
  december: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class linechartdepart extends Model<linechartdepartAttributes>
    implements linechartdepartAttributes {
    id!: number;
    division!: string;
    department!: string;
    january!: number;
    february!: number;
    march!: number;
    april!: number;
    may!: number;
    june!: number;
    july!: number;
    august!: number;
    september!: number;
    october!: number;
    november!: number;
    december!: number;
    static associate(models: any) {
      // define association here
    }
  }
  linechartdepart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    division: DataTypes.STRING,
    department: DataTypes.STRING,
    january: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    february: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    march: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    april: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    may: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    june: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    july: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    august: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    september: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    october: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    november: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    december: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'linechartdepart',
  });
  return linechartdepart;
};