export interface IColumn{
    id? : number;
    boardId : number;
    name : string;
    place : number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}