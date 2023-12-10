export interface ISheet{
    id? : number;
    projectId : number;
    name :string;
    body : string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}