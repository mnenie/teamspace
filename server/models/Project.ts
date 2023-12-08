import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {IProject} from '../../models/Project'
import Board from './Board';
import Sheet from './Sheet';
import Member from './Member';

class Project extends Model<IProject, Optional<IProject, 'id'>> implements IProject {
    public id!: number;
    public ownerId!: number;
    public name!: string;
  
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  export interface UserInput extends Optional<IProject, 'id'> {}
  export interface UserOutput extends Required<IProject> {}
  

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
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
  
  export default Project;

  Project.hasMany(Board, {foreignKey : 'projectId'});
  Project.hasMany(Sheet, {foreignKey : 'projectId'});
  Project.hasMany(Member, {foreignKey : 'projectId'});