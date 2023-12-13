export interface IProduct{
    id? : number;
    projectId : number;
    name : string;
    cost : number;
    // == -1 if count if infinite
    count : number;
}