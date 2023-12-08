export interface ISheet{
    id : number;
    documentationId : number;
    name :string;
    body : string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}