import Express from 'express';
import ChatController from '../controller/chat.controller';


let chatRouter = Express.Router();

chatRouter.get('/conversations/:userId', ChatController.getConversations);
chatRouter.get('/chat/:conversationId', ChatController.getChat)

export default chatRouter;