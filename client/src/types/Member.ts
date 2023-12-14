export interface IMember{
    id : number;
    userId : number;
    projectId : number;
    role : string;
    points : number;
    User? : {id : number, username : string};

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}