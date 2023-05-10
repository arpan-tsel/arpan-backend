'use strict';
import { Model} from 'sequelize';

interface useraccountAttributes {
  id: number,
  uuid:string,
  name: string,
  username: string,
  password: string,
  role: Enumerator,
  employee_title: string,
  department: string,
  division: string,
  sub_directorate: string,
  address: string,
  phone: string,
  refreshToken: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class useraccount extends Model <useraccountAttributes> 
  
  implements useraccountAttributes{
    id!:number;
    uuid!:string;
    name!: string;
    username!: string;
    password!: string;
    role!: Enumerator;
    employee_title!: string;
    department!: string;
    division!: string;
    sub_directorate!: string;
    address!: string;
    phone!: string;
    refreshToken!: string;

    static associate(models: any) {
      // define association here
    }
  }

  enum useraccountsRole {
    admin = 'admin',
    regular = 'regular',
    quality = 'quality'
  }

  useraccount.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    name: {
      type :DataTypes.STRING(70),
      validate: {
        len: {
          args : [5, 60],
          msg: 'Nama minimal 5 karakter dan maksimal 60 karakter'}
        
      }
    },
    username: {
      type :DataTypes.STRING(30),
      validate: {
        len: {
          args : [8, 24],
          msg: 'Username minimal 8 karakter dan maksimal 24 karakter'},
        is: {
          args: /^[a-z0-9]+$/i,
          msg: 'username hanya alphanumerik'}
        
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM(...Object.values(useraccountsRole)),
    employee_title: DataTypes.STRING(100),
    department: DataTypes.STRING(100),
    division: DataTypes.STRING(80),
    sub_directorate: DataTypes.STRING(100),
    address: DataTypes.STRING(100),
    phone: DataTypes.STRING(20),
    refreshToken: DataTypes.STRING(300)
  }, {
    sequelize,
    modelName: 'useraccount',
  });
  return useraccount;
};