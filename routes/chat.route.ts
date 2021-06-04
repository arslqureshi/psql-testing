import Express from 'express';
import ChatController from '../controller/chat.controller';


let chatRouter = Express.Router();

chatRouter.get('/conversations/:userId', ChatController.getConversations);
chatRouter.get('/getChat/:conversationId', ChatController.getChat)

export default chatRouter;