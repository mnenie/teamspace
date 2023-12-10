export interface ITask{
    id? : number;
    state : string;
    name : string;
    creatorId? : number;
    memberId? : number
    columnId : number;
    startDate? : Date;
    endDate? : Date;
    importance : number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}