import express from 'express'
import UserRouter from './user.route';
import ProductRouter from './product.route';
import OrderRouter from './order.route';
import WarehouseRouter from './warehouse.route'

import authGuard from './authGuard.route';

const router = express.Router();
import emailController from '../controller/email.controller';

router.get('/', (req, res) => {
  // emailController.sendmail("testing", "Testing email", "arslq7@gmail.com");
  res.send('hello from server');
})

router.use('/order', OrderRouter);
router.use('/user', UserRouter);
router.use('/product', ProductRouter);
router.use('/warehouse', WarehouseRouter);

export default router;