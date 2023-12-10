import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import seq from '../db/postgres';
import { IMessage } from '../interfaces/Message';



class Message extends Model<IMessage, Optional<IMessage, 'id'>> implements IMessage {
  public id!: number;
  public userId!: number;
  public roomId!: number;
  public body!: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

export interface MessageInput extends Optional<IMessage, 'id'> {}
export interface MessageOutput extends Required<IMessage> {}

Message.init(
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
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    body: {
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



export default Message;
