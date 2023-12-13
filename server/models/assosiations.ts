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
    Board.belongsTo(Project, {foreignKey : 'projectId'});
    Column.belongsTo(Board, {foreignKey : 'boardId'});
    Column.hasMany(Task, {foreignKey : 'columnId'});
    
    Member.belongsTo(User, {foreignKey : 'userId'});
    Member.belongsTo(Project, {foreignKey : 'projectId'});
    
    Task.belongsTo(Column, {foreignKey : 'columnId'});
    Task.belongsTo(Member, {foreignKey : 'memberId'});
    Member.hasMany(Task, {foreignKey : 'memberId'});
    
    Project.hasMany(Board, {foreignKey : 'projectId'});
    Project.hasMany(Sheet, {foreignKey : 'projectId'});
    Project.hasMany(Member, {foreignKey : 'projectId'});
    Project.hasMany(Room, {foreignKey : 'projectId'});

    Message.belongsTo(User, {foreignKey : 'userId'});
    Message.belongsTo(Room, {foreignKey : 'roomId'});
 
    Room.belongsTo(Project, {foreignKey : 'projectId'});
    Room.hasMany(Message, {foreignKey : 'roomId'});
 
    Sheet.belongsTo(Project, {foreignKey : 'projectId'});
    
    User.hasMany(Project, {foreignKey : 'ownerId'});
    User.hasMany(Member, {foreignKey: 'userId'});
    
}

