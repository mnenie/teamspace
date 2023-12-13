import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import { IInterval as II } from '../interfaces/Interval';
class Interval extends Model<II, Optional<II, 'id'>> implements II {
    public id!: number;
    public roadmapId!: number;
    public date!: string;
    public title!: string;
    public body!: string;
  
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  export interface IntervalInput extends Optional<II, 'id'> {}
  export interface IntervalOutput extends Required<II> {}
  

  Interval.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roadmapId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      }, title: {
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
  
  export default Interval;

