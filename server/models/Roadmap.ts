import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import { IRoadmap as IR } from '../interfaces/Roadmap';
class Roadmap extends Model<IR, Optional<IR, 'id'>> implements IR {
    public id!: number;
    public projectId!: number;
    public name!: string;
  
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  export interface RoadmapInput extends Optional<IR, 'id'> {}
  export interface RoadmapOutput extends Required<IR> {}
  

  Roadmap.init(
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
  
  export default Roadmap;

