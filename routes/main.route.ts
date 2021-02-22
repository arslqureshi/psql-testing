import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();

router.get('/', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.send('hello from server');
})

router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;