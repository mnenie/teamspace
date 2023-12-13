import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {IMember} from '../interfaces/Member'

class Member extends Model<IMember, Optional<IMember, 'id'>> implements IMember {
    public id!: number;
    public userId!: number;
    public projectId!: number;
    public role!: string;
    public points!: number;
  
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  Member.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize: seq, 
      paranoid: true,
    }
  );
  
  export default Member;

