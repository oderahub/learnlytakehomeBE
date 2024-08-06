import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-source'; 
import { v4 as uuidv4 } from 'uuid'; 

class User extends Model {
  public id!: string; 
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: uuidv4, 
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
