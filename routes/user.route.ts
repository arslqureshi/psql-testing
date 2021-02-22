import Express from 'express';
import UserController from '../controller/user.controller';

import authGuard from './authGuard.route';

let UserRouter = Express.Router();

UserRouter.post('/', UserController.register);
UserRouter.get('/',authGuard, UserController.get)

export default UserRouter;