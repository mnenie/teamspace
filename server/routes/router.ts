import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import multer from 'multer';
import ChatController from '../controllers/ChatController';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.post('/project')
router.delete('/project')
router.put('/project')

router.post('/board')
router.delete('/board')
router.put('/board')

router.post('/task')
router.delete('/task')
router.put('/task')

router.post('/chat/room', ChatController.createRoom);
router.delete('/chat/room', ChatController.deleteRoom);

router.post('/chat/message', ChatController.createMessage);
router.get('/chat/message', ChatController.getMessagesByRoomId); 



export default router;