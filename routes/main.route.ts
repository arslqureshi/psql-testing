import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();

router.get('/',(req,res)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    res.send('hello from Server');
});

router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;