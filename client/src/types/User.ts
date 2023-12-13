import type { IUserName } from "./Username";

export interface IUser{
    id? : number;
    email : string;
    username : IUserName;
    password : string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}