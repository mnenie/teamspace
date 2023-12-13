import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import { IInvitation as II } from '../interfaces/Invitation';
class Invitation extends Model<II, Optional<II, 'id'>> implements II {
    public id!: number;
    public isActive!: boolean;
    public projectId!: number;

    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
  }
  
  export interface InvitationInput extends Optional<II, 'id'> {}
  export interface InvitationOutput extends Required<II> {}
  

  Invitation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      projectId: {
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
  
  export default Invitation;

