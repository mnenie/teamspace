import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {IUser} from '../../models/User'
import Project from './Project';
import Member from './Member';
class User extends Model<IUser, Optional<IUser,'id'>> implements IUser{
    public id! : number;
    public email! : string;
    public username! : string;
    public password! : string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export interface UserInput extends Optional<IUser, 'id'> {}
export interface UserOutput extends Required<IUser> {}

User.init({
    id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
    },
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type : DataTypes.STRING
    }
},{
    timestamps: true,
    sequelize:seq,
    paranoid: true,

})

export default User;

User.hasMany(Project, {foreignKey : 'ownerId'});
User.hasMany(Member, {foreignKey: 'userId'});