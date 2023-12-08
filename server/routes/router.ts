import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import multer from 'multer';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
// router.get('/users/verify', UserController.verify);



export default router;