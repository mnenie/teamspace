import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import seq from '../db/postgres';
import { IProduct as IP} from '../interfaces/Product';



class Product extends Model<IP, Optional<IP , 'id'>> implements IP {
  public id!: number;
  public projectId!: number;
  public cost!: number;
  public count!: number;
  public name!: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

export interface ProductInput extends Optional<IP, 'id'> {}
export interface ProductOutput extends Required<IP> {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: seq,
    paranoid: true,
  }
);



export default Product;
