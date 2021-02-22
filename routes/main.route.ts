import express from 'express'
import todoRouter from './todo.route';
import UserRouter from './user.route';

import authGuard from './authGuard.route';

const router = express.Router();
import emailController from '../controller/email.controller';

router.get('/', (req, res) => {
  // emailController.sendmail("testing", "Testing email", "arslq7@gmail.com");
  res.send('hello from server');
})

router.use('/todo', todoRouter);
router.use('/user', UserRouter);

export default router;