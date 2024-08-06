import { DataTypes, Model } from 'sequelize';
import sequelize from '../data-source'; 
import { v4 as uuidv4 } from 'uuid'; 

class Product extends Model {
  public id!: string; 
  public name!: string;
  public description!: string;
  public price!: number;
  public imageURL!: string;
  public createdBy!: string; 
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.UUID, 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
);

export default Product;
