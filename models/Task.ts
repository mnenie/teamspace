export interface ITask{
    id : number;
    state : string;
    name : string;
    creatorId : number;
    memberId : number
    columnId : number;
    startDate : Date;
    endDate : Date;
    

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}