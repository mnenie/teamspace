import {Request,Response, NextFunction} from 'express';
import Sheet from '../models/Sheet';
import ApiError from '../errors/ApiError';

export default class DocumentationController{


	static async create(req: Request, res: Response, next : NextFunction){
        try{
			const sheet : Sheet    = req.body;
			const createdDoc : Sheet = await Sheet.create(sheet);
			res.status(200).json(createdDoc);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async getAll(req: Request, res: Response, next : NextFunction){
        try{
			const {id} = req.params;
			const sheets = await Sheet.findAll({
                attributes : ['id','name'],
                where: {projectId: parseInt(id)}});
			res.status(200).json(sheets);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async get(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            const sheet = await Sheet.findOne({where: {id: parseInt(id)}});
			res.status(200).json(sheet);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async delete(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            await Sheet.destroy({
                where: {id : parseInt(id)}
            });
			res.status(200).json({"message" : "delete success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async saveNewBody(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            const {body} = req.body;
            await Sheet.update({body : body}, {where : {id:id}});
			res.status(200).json({"message" : "save success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async rename(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            const {name} = req.body;
            await Sheet.update({name : name}, {where : {id:id}});
			res.status(200).json({"message" : "rename success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

   
}