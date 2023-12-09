import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import ChatController from '../controllers/ChatController';
import ProjectController from '../controllers/ProjectController';
import DocumentationController from '../controllers/DocumentationController';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.post('/project', ProjectController.createProject);
router.delete('/project', ProjectController.deleteProject);
router.put('/project', ProjectController.renameProject);
router.put('/getAll/:userId', ProjectController.getAll);


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

router.post('/documentation', DocumentationController.create);
router.get('/documentation/:userId', DocumentationController.getAll);
router.get('/documentation/:id', DocumentationController.get);
router.delete('/documentation', DocumentationController.delete);




export default router;