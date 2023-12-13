import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';
import Invitation from '../models/Invitation';
import Member from '../models/Member';
import jwt from 'jsonwebtoken';
export default class InvitationController{
    static async generateInvitation(req: Request, res: Response, next : NextFunction){
        try{
            const {id} = req.params
            const invite = await Invitation.create({isActive: true, projectId : parseInt(id as string)})
            res.status(200).json(invite);            
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async claimInvitation(req: Request, res: Response, next : NextFunction){
        try {
            const { id, role, token } = req.query;
            const decoded = jwt.verify(token as string, process.env.SECRET_KEY as string);
            console.log('decoded: ',  decoded)
            if (!decoded) {
                return next(ApiError.badRequest('Пользователь неавторизован'));
            }
            const invitation = await Invitation.findOne({ where : {id: parseInt(id as string)} });
            console.log('invitation: ',invitation)
            if (!invitation) {
                return next(ApiError.badRequest('Приглашение не найдено'));
            }
            if(!invitation.isActive){
                return next(ApiError.badRequest('Приглашение не активно'));
            }
            const member = new Member({
                role: role as string,
                projectId: invitation.projectId,
                userId : (decoded as any).id,
                points : 0,
            });
            console.log('member: ',member)
            
            await Promise.all([member.save(), invitation.update({ isActive: false })]);

            res.status(200).json({ message: 'Приглашение успешно использовано' });
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    
}