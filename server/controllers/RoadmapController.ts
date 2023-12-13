import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';


export default class RoadmapController{
    static async create(req: Request, res: Response, next : NextFunction){
        try{
           //todo
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

   
}