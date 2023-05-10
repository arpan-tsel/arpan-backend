'use strict';
import { Model} from 'sequelize';

interface UserAttributes {
  id: number,
  name: string,
  username: string,
  email: string,
  employee_title: string,
  department: string,
  division: string,
  sub_directorate: string,
  address: string,
  phone: string,
  password: string,
  refreshToken: string,
  resetToken: string,
  expiration: Date,
  used: number
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model<UserAttributes> 
  implements UserAttributes {

    id!:number;
    name!: string;
    username!: string;
    email!: string;
    password!: string;
    employee_title!: string;
    department!: string;
    division!: string;
    sub_directorate!: string;
    address!: string;
    phone!: string;
    refreshToken!: string;
    resetToken!: string;
    expiration!: Date;
    used!: number

    static associate(models: any) {
      // define association here
    }
  }
  Users.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING(50),
    username: {
      type :DataTypes.STRING(30),
      validate: {
        len: {
          args : [8, 24],
          msg: 'Username minimal 8 karakter dan maksimal 24 karakter'},
        is: {
          args: /^[a-z0-9]+$/i,
          msg: 'nama hanya alphanumerik'}
        
      }
    },
    email:  {
      type :DataTypes.STRING(50),
      unique:true,
      // validate: {
      //   isEmail: true
      // }
    },
    password: {
      type :DataTypes.STRING(30),
      allowNull:false,
    },
    employee_title: {
      type:DataTypes.STRING(100)
    },
    department: {
      type:DataTypes.STRING(100)
    },
    division: {
      type:DataTypes.STRING(80)
    },
    sub_directorate: {
      type:DataTypes.STRING(100)
    },
    address: {
      type:DataTypes.STRING(100)
    },
    phone: {
      type:DataTypes.STRING(20)
    },
    refreshToken: DataTypes.STRING(300),
    resetToken: DataTypes.STRING(300),
    expiration: DataTypes.DATE,
    used: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};