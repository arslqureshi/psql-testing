import Express from 'express';
import OrderController from '../controller/order.controller';


let OrderRouter = Express.Router();

OrderRouter.post('/add', OrderController.add);
OrderRouter.get('/getAllOrders/:userId', OrderController.getAllOrders);
OrderRouter.put('/updateOrderStatus', OrderController.updateOrderStatus);
OrderRouter.put('/addTrackingNumber', OrderController.addTrackingNumber);

export default OrderRouter;