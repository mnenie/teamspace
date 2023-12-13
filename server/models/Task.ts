import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {ITask} from '../interfaces/Task'
import Column from './Column';
import Member from './Member';
class Task extends Model<ITask, Optional<ITask,'id'>> implements ITask{
    public id! : number;
    public state! : string;
    public name! : string;
    public creatorId? : number;
    public memberId? : number
    public columnId! : number;
    public startDate? : Date;
    public endDate? : Date;
    public importance!: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
}

export interface UserInput extends Optional<ITask, 'id'> {}
export interface UserOutput extends Required<ITask> {}

Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      importance:{
        type : DataTypes.INTEGER,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
      },
      memberId: {
        type: DataTypes.INTEGER,
      },
      columnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      sequelize: seq, 
      paranoid: true,
    }
  );
  
export default Task;

