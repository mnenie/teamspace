import {Request,Response, NextFunction} from 'express';
import Project,{ProjectInput} from '../models/Project';
import ApiError from '../errors/ApiError';
import Room from '../models/Room';
import Sheet from '../models/Sheet';
import Board from '../models/Board';
import Column from '../models/Column';
import Task from '../models/Task';
import Member from '../models/Member';
import {TaskStatus} from '../interfaces/consts';
import User from '../models/User';
import Product from '../models/Product';


export default class ProjectController{

	static async createProject(req: Request, res: Response, next : NextFunction){
        try{
			const projectData : ProjectInput = req.body;
            const {dataValues} : Project = await Project.create(projectData);
            const project = dataValues;
            await Member.create({userId : projectData.ownerId,points : 0, projectId: project.id,role : 'Тимлид' })
            await Room.create({projectId : project.id, name : "Чат"});
            await Sheet.create({projectId : project.id, name : "Документация", body : "<h1>Пишите документацию сюда!</h1>"});
            await Product.create({projectId : project.id, name : "Кофе", count : -1, cost : 50});
            await Product.create({projectId : project.id, name : "Мерч", count : 312, cost : 200});
            const board = await Board.create({projectId : project.id, name : "Доска"});
            
            const firstColumn : Column = await Column.create({boardId : board.id, name : "В планах", place : 1});
            await Column.create({boardId : board.id, name : "В процессе", place : 2});
            await Column.create({boardId : board.id, name : "Выполнены", place : 3});
            
            await Task.create({columnId : firstColumn.id,
                            importance : 0,
                            name : "Изучите работу проекта",
                            state : TaskStatus.Active,});

            res.status(200).json(project);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async deleteProject(req: Request, res: Response, next : NextFunction){
		try{
            const {id} : {id : string} = req.body;
            await Project.destroy({
                where: {id : parseInt(id)}
            });
            res.status(200).json({"message" : "delete success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }


    static async renameProject(req: Request, res: Response, next : NextFunction){
        try{
            const {id, name} : {id: string, name : string} = req.body;
            await Project.update({name : name}, {where : {id}});
            res.status(200).json({"message" : "rename success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}
    //deprecated 
    static async getAll(req: Request, res: Response, next : NextFunction){
        try{
            const {userId} = req.params;
            const data = await Project.findAll( {where : {ownerId: userId}});
            res.status(200).json(data)
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async getAllProjectsWhereUserIsMember(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const projects = await Project.findAll({
                include: [
                    {
                        model: Member,
                        where: { userId },
                    },
                ],
            });

            res.status(200).json(projects);
        } catch (err: any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async getAllMembersOfProject(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const projects = await Member.findAll({
                        where: { projectId : id },
                        include : [{
                            model : User,
                            attributes : ['id','username']
                        }
                        ]
            });

            res.status(200).json(projects);
        } catch (err: any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }
   
}