import Express from 'express';
import UserController from '../controller/user.controller';

import authGuard from './authGuard.route';

let UserRouter = Express.Router();

UserRouter.post('/signup', UserController.register);
UserRouter.get('/',authGuard, UserController.get);
UserRouter.post('/login', UserController.login);
UserRouter.post('/resetPasswordRequest', UserController.resetPasswordRequest);
UserRouter.post('/resetPassword', UserController.resetPassword);
UserRouter.post('/username', UserController.checkUsername);
UserRouter.post('/createCard', UserController.createCard);
UserRouter.get('/getCards/:personId', UserController.getCards);


export default UserRouter;