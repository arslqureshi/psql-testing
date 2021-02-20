import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello from server');
})

router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;