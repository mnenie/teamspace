export interface IMessage{
    id? : number;
    userId : number;
    roomId : number;
    body : string;
    
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}