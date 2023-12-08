import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import multer from 'multer';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.post('/project')
router.delete('/project')
router.put('/project')

router.post('/board')
router.delete('/board')
router.put('/board')

router.post('/Task')
router.delete('/Task')
router.put('/Task')

export default router;