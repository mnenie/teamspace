export interface IMember{
    id? : number;
    userId : number;
    projectId : number;
    role : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}