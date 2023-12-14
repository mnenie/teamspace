import {Request,Response, NextFunction} from 'express';
import Board from '../models/Board';
import ApiError from '../errors/ApiError';
import Task from '../models/Task';
import Column from '../models/Column';
import { TaskStatus } from '../interfaces/consts';
import Member from '../models/Member';

export default class BoardController{

	static async createBoard(req: Request, res: Response, next : NextFunction){
		try{
			const board : Board = req.body;
			const created: Board = await Board.create(board);
			res.status(200).json(created);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

	static async createTask(req: Request, res: Response, next : NextFunction){
		try{
			const task : Task    = req.body;
			const created: Task = await Task.create(task);
			res.status(200).json(created);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
		
	}

	static async createColumn(req: Request, res: Response, next : NextFunction){
		try{
			const column : Column    = req.body;
			const created: Column = await Column.create(column);
			res.status(200).json(created);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}
    static async getAllBoards(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
			const boards = await Board.findAll({where: {projectId: id}});
			res.status(200).json(boards);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

	static async getTasksByBoard(req: Request, res: Response, next : NextFunction){
		try{
			const { id } = req.params;
			const boardInfo = await Board.findOne({where: { id : id}});
			const columns = await Column.findAll({ where: { boardId: parseInt(id) } });
			const columnsWithTasks = await Promise.all(
				columns.map(async (column) => {
					const tasks = await Task.findAll({
						where: { columnId: column.id},
						order: [['importance', 'ASC']], });

					return {
						column: column,
						tasks: tasks,
					};
				})
			);

        	res.status(200).json({board : boardInfo, info: columnsWithTasks});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async deleteBoard(req: Request, res: Response, next : NextFunction){
		try{
			const { id } = req.params;
			await Board.destroy({
                where: {id : parseInt(id)}
            });
			res.status(200).json({"message" : "delete success"});;
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

	static async renameBoard(req: Request, res: Response, next : NextFunction){
		try{
			const { id } = req.params;
			const {name } = req.body;
			await Board.update({name : name}, {where : {id: id}})
        	res.status(200).json({"message" : "rename success"});;
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

	static async completeTask(req: Request, res: Response, next : NextFunction){
		try{
			const { memberId } = req.body;
			const { id } = req.params;
			await Task.update({state : TaskStatus.Completed}, {where : {id: id}})
			const memz  : Member | null = await Member.findOne({where: {id : memberId}});
			if(!memz){
				return next(ApiError.badRequest(`НЕ найден пользователь: ${memz}`));

			}
			await Member.update({points : memz?.points! + 5}, {where : {id: memberId}})
        	res.status(200).json({"message" : "task complete success"});;
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

	static async dragTask(req: Request, res: Response, next : NextFunction){
		try{
			const { id} = req.params;
			const {importance} = req.body;
			await Task.update({importance : importance}, {where : {id: id}})
        	res.status(200);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}


   
}