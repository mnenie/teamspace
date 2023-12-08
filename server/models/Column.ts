import seq from '../db/postgres';
import { DataTypes, Model, Optional } from 'sequelize';
import {IColumn} from '../../models/Column'

export interface IMember{
    id : number;
    boardId : number;
    name : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}