import {Request,Response, NextFunction} from 'express';
import Project,{ProjectInput} from '../models/Project';
import ApiError from '../errors/ApiError';
import Room from '../models/Room';
import Sheet from '../models/Sheet';
import Board from '../models/Board';
import Column from '../models/Column';
import Task from '../models/Task';

export default class ProjectController{

	static async createProject(req: Request, res: Response, next : NextFunction){
        try{
			const projectData : ProjectInput = req.body;
            const {dataValues} : Project = await Project.create(projectData);
            const project = dataValues;
            console.log(project);
            await Room.create({projectId : project.id, name : "Чат"});
            await Sheet.create({projectId : project.id, name : "Документация", body : "Пишите документацию сюда!"});
            const board = await Board.create({projectId : project.id, name : "Доска"});
            
            const firstColumn : Column = await Column.create({boardId : board.id, name : "В планах", place : 1});
            await Column.create({boardId : board.id, name : "В процессе", place : 2});
            await Column.create({boardId : board.id, name : "Выполнены", place : 3});
            
            await Task.create({columnId : firstColumn.id,
                            importance : 0,
                            name : "Изучите работу проекта",
                            state : "Активно",});

            res.status(200).json(project);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async deleteProject(req: Request, res: Response, next : NextFunction){
		try{
            const {id} : {id : string} = req.body;
            const project : Project | null= await Project.findOne({where : {id}});
            if (!project) return next(ApiError.badRequest(`Проекта не сущствует`));
            await project.destroy();
            res.status(200)
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }


    static async renameProject(req: Request, res: Response, next : NextFunction){
        try{
            const {id, name} : {id: string, name : string} = req.body;
            await Project.update({name : name}, {where : {id}});
            res.status(200)
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async getAll(req: Request, res: Response, next : NextFunction){
        try{
            const {userId} = req.params;
            const data = await Project.findAll( {where : {ownerId: userId}});
            res.status(200).json(data)
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}
   
}