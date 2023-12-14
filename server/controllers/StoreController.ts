import {Request,Response, NextFunction} from 'express';
import ApiError from '../errors/ApiError';
import Product, {ProductInput} from '../models/Product';
import { IPurchaseInfo } from '../interfaces/PurschaseInfo';
import Member from '../models/Member';
export default class StoreController{
    static async createProduct(req: Request, res: Response, next : NextFunction){
        try{
			const msg :  ProductInput  = req.body;
			const created : Product = await Product.create(msg);
			res.status(200).json(created);
        }catch(err : any) {
            return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
    }

    static async getAllProducts(req: Request, res: Response, next : NextFunction){
      try{
        const {id} = req.params; 
        const sth = await Product.findAll({where : {projectId: id}})
        res.status(200).json(sth);
      }catch(err : any) {
          return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
      }
  }

    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
          const productId: string = req.params.id; 
          await Product.destroy({where:{id :parseInt(productId)}},);
    
          res.status(200).json({ message: 'delete succsess' });
        } catch (err: any) {
          return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
      }
    
      static async makePurchase(req: Request, res: Response, next: NextFunction) {
        try {
            const info: IPurchaseInfo = req.body; 
            const purchasedProduct: Product | null = await Product.findOne({where: {id : info.productId}});
            if (!purchasedProduct) {
            return next(ApiError.badRequest('Продукт не найден'));
            }
            if(purchasedProduct.count == 0) {
            return next(ApiError.badRequest('Продукт не закончился'));
            }
            const member : Member | null = await Member.findOne({where: {id :info.memberId}}); 
            if (!member) {
                return next(ApiError.badRequest('Участеник не найден'));
            }
            if (member.points < purchasedProduct.cost) {
                return next(ApiError.badRequest('Не хватает поинтов'));
            }
            member.points - purchasedProduct.cost
            await purchasedProduct.update({count : purchasedProduct.count-1});
            await member.update({points : member.points - purchasedProduct.cost});

            res.status(200).json({ message: 'Покупка успешно совершена' });
        } catch (err: any) {
          return next(ApiError.internal(`Непредвиденная ошибка: ${err.message}`));
        }
      }
   
}