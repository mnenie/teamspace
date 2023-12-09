import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';
import Message, {MessageInput, MessageOutput} from '../models/Message';
import Room, {RoomInput} from '../models/Room';
import { randomBytes } from 'crypto';
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
			const { id } = req.query;
			if (!id){
				return next(ApiError.badRequest(`Комнаты несуществует`));
			}
			const messages = await Message.findAll({where: { roomId: parseInt(id as string) } });
			return res.status(200).json(messages);
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
		const room : RoomInput = req.body;
		const destroyableRoom : Room | null = await Room.findOne({where : { id: room.id}});
		if (!destroyableRoom){
			return next(ApiError.badRequest(`Комнаты несуществует`));
		}
		destroyableRoom.destroy();

		return res.status(200);
		}catch(err : any) {
		return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
		}
	}



   
}