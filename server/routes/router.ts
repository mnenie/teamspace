import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import ChatController from '../controllers/ChatController';
import ProjectController from '../controllers/ProjectController';
import DocumentationController from '../controllers/DocumentationController';
import BoardController from '../controllers/BoardController';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.post('/project', ProjectController.createProject);
router.delete('/project', ProjectController.deleteProject);
router.put('/project', ProjectController.renameProject);
router.put('/getAll/:userId', ProjectController.getAll);

router.post('/board', BoardController.createBoard);
router.get('/board/tasks/:id', BoardController.getTasksByBoard);
router.get('/board/project/:id', BoardController.getAllBoards);
router.put('/board/rename/:id',BoardController.renameBoard);
router.delete('/board', BoardController.deleteBoard);
router.put('/board/task/complete/:id', BoardController.completeTask);
router.put('/board/task/drag/:id', )

router.post('/chat/room', ChatController.createRoom);
router.delete('/chat/room', ChatController.deleteRoom);

router.post('/chat/message', ChatController.createMessage);
router.get('/chat/message', ChatController.getMessagesByRoomId); 

router.post('/documentation', DocumentationController.create);
router.get('/documentation/project/:id', DocumentationController.getAll);
router.get('/documentation/:id', DocumentationController.get);
router.delete('/documentation/:id', DocumentationController.delete);




export default router;