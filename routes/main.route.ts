import express from 'express'
import todoRouter from './todo.route';

const router = express.Router();

router.get('/',(req,res)=> {
    res.send('hello from routes');
});

router.use('/todo', todoRouter);

export default router;