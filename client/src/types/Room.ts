export interface IRoom{
    id? : number;
    projectId : number;
    name : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}