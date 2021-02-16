import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();

router.get('/',(req,res)=> {
    res.send('hello from Server');
});

router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;