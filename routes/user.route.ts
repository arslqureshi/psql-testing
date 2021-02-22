import Express from 'express';
import UserController from '../controller/user.controller';

import authGuard from './authGuard.route';

let UserRouter = Express.Router();

UserRouter.post('/',authGuard, UserController.register);
UserRouter.get('/', UserController.get)

export default UserRouter;