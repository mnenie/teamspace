import {Router} from 'express';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';
import ChatController from '../controllers/ChatController';
import ProjectController from '../controllers/ProjectController';
import DocumentationController from '../controllers/DocumentationController';
import BoardController from '../controllers/BoardController';
import RoadmapController from '../controllers/RoadmapController';
import StoreController from '../controllers/StoreController';
import InvitationController from '../controllers/InvitationController';


const router = Router();

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

router.post('/project', ProjectController.createProject);
router.delete('/project', ProjectController.deleteProject);
router.put('/project', ProjectController.renameProject);
router.get('/all/:userId', checkAuth, ProjectController.getAllProjectsWhereUserIsMember);
router.get('/project/members/:id' , ProjectController.getAllMembersOfProject);

router.post('/board', BoardController.createBoard);
router.post('/board/task', BoardController.createTask);
router.post('/board/column', BoardController.createColumn);
router.get('/board/tasks/:id', BoardController.getTasksByBoard);
router.get('/board/project/:id', BoardController.getAllBoards);
router.put('/board/rename/:id',BoardController.renameBoard);
router.delete('/board/:id', BoardController.deleteBoard);
router.put('/board/task/complete/:id', BoardController.completeTask);
router.put('/board/task/drag/:id',BoardController.dragTask);

router.post('/chat/room', ChatController.createRoom);
router.delete('/chat/room/:id', ChatController.deleteRoom);
router.get('/chat/rooms/:id', ChatController.getRooms);

router.post('/chat/message', ChatController.createMessage);
router.get('/chat/message/:id', ChatController.getMessagesByRoomId); 

router.post('/documentation', DocumentationController.create);
router.get('/documentation/project/:id', DocumentationController.getAll);
router.get('/documentation/:id', DocumentationController.get);
router.put('/documentation/:id', DocumentationController.saveNewBody);
router.put('/documentation/rename/:id', DocumentationController.rename);
router.delete('/documentation/:id', DocumentationController.delete);

router.post('/roadmap', RoadmapController.create);
router.get('/roadmap/project/:id', RoadmapController.getAll);
router.get('/roadmap/:id', RoadmapController.getOne);
router.post('/roadmap/interval', RoadmapController.addInterval);
router.put('/roadmap/rename/:id', RoadmapController.rename);
router.delete('/roadmap/:id', RoadmapController.delete);

router.post('/store/product', StoreController.createProduct);
router.delete('/store/product/:id', StoreController.deleteProduct);
router.get('/store/purchase/', StoreController.makePurchase);
router.get('/store/:id', StoreController.getAllProducts);


router.get('/invitation', InvitationController.claimInvitation);
router.post('/invitation/:id', InvitationController.generateInvitation)

export default router;