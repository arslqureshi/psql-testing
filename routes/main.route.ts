import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();


router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;