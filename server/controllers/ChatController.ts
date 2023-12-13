import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';
import Message, {MessageInput, MessageOutput} from '../models/Message';
import Room, {RoomInput} from '../models/Room';
import { randomBytes } from 'crypto';
import Member from '../models/Member'; 
import User from '../models/User'; 
export default class ChatController{
    static async createMessage(req: Request, res: Response, next : NextFunction){
        try{
			const msg :  MessageInput  = req.body;
			const createdMessage : Message = await Message.create(msg);
			res.status(200).json(createdMessage as MessageOutput);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

	static async getMessagesByRoomId(req: Request, res: Response, next : NextFunction){
		try{
			const { id } = req.params;
			if (!id){
				return next(ApiError.badRequest(`Комнаты несуществует`));
			}
			const messages = await Message.findAll({
				where: { roomId: parseInt(id as string) },
				include: [
				  {
					model: User,
					attributes: ['id','username'],
				},
				],
			  });
			const room = await Room.findOne({where :{id :parseInt(id)}});
			return res.status(200).json({room,messages});
		}catch(err : any) {
			return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
		}
	}

	static async createRoom(req: Request, res: Response, next : NextFunction){
		try{
			const room : RoomInput = req.body;
			if (!room.projectId){
				return next(ApiError.badRequest(`Проекта не существует`));
			}
			if (!room.name){
				room.name = 'room' + randomBytes(3); 
			}
			const createdRoom : Room = await Room.create(room);
			return res.status(200).json(createdRoom);
		}catch(err : any) {
			return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
		}
	}

	static async deleteRoom(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
			await Room.destroy({
                where: {id : parseInt(id)}
            });

			return res.status(200).json({"message" : "delete success"});;
		}catch(err : any) {
			return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
		}
	}

	static async getRooms(req: Request, res: Response, next : NextFunction){
		try{
			const {id} = req.params;
			const rooms = await Room.findAll({where : { projectId: id}});

			return res.status(200).json(rooms);
		}catch(err : any) {
			return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
		}
	}	


   
}