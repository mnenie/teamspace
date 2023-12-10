import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {IBoard} from "../interfaces/Board"

class Board extends Model<IBoard, Optional<IBoard, 'id'>> implements IBoard {
    public id!: number;
    public projectId!: number;
    public name!: string;
  
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  Board.init(
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




  export default Board;

