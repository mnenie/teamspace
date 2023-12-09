import Board from "./Board";
import Column from "./Column";
import Member from "./Member";
import Message from "./Message";
import Project from "./Project";
import Room from "./Room";
import Sheet from "./Sheet";
import Task from "./Task";
import User from "./User";

export function defineAssociations() {
    Board.hasMany(Column, {foreignKey : 'boardId'});
    Board.belongsTo(Project);
    Column.belongsTo(Board)
    Column.hasMany(Task, {foreignKey : 'columnId'});
    
    Member.belongsTo(User);
    Member.belongsTo(Project);
    
    Task.belongsTo(Column);
    Task.belongsTo(Member);
    Member.hasMany(Task, {foreignKey : 'memberId'});
    
    Project.hasMany(Board, {foreignKey : 'projectId'});
    Project.hasMany(Sheet, {foreignKey : 'projectId'});
    Project.hasMany(Member, {foreignKey : 'projectId'});
    Message.belongsTo(User);
    Message.belongsTo(Room);
    Room.belongsTo(Project);
    Sheet.belongsTo(Project);
    
    User.hasMany(Project, {foreignKey : 'ownerId'});
    User.hasMany(Member, {foreignKey: 'userId'});
    
}

