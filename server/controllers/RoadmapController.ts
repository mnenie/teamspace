import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';
import Roadmap, {RoadmapInput} from '../models/Roadmap'
import Interval, { IntervalInput } from '../models/Interval';
export default class RoadmapController{
    
	static async create(req: Request, res: Response, next : NextFunction){
        try{
			const sheet : RoadmapInput    = req.body;
			const createdDoc = await Roadmap.create(sheet);
			res.status(200).json(createdDoc);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async getAll(req: Request, res: Response, next : NextFunction){
        try{
			const {id} = req.params;
			const sheets = await Roadmap.findAll({
                where: {projectId: parseInt(id)}});
			res.status(200).json(sheets);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async getOne(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            const sheet = await Interval.findAll({where: {roadmapId: parseInt(id)}});
			res.status(200).json(sheet);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async delete(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            await Interval.destroy({
                where: {roadmapId : parseInt(id)}
                
            })
            await Roadmap.destroy({
                where: {id : parseInt(id)}
            });
			res.status(200).json({"message" : "delete success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async addInterval(req: Request, res: Response, next : NextFunction){
		try{
            const body : IntervalInput = req.body;
            const interval = await Interval.create(body);
			res.status(200).json(interval);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

    static async rename(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
            const {name} = req.body;
            await Roadmap.update({name : name}, {where : {id:id}});
			res.status(200).json({"message" : "rename success"});
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
	}

   
}