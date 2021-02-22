import Express from 'express';
import UserController from '../controller/user.controller';

import authGuard from './authGuard.route';

let UserRouter = Express.Router();

UserRouter.post('/', UserController.register);
UserRouter.get('/',authGuard, UserController.get)
UserRouter.post('/resetPasswordRequest', UserController.resetPasswordRequest)
UserRouter.post('/resetPassword', UserController.resetPassword)

export default UserRouter;