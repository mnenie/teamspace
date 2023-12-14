export interface IMember{
    id : number;
    userId : number;
    projectId : number;
    role : string;
    points : number;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
