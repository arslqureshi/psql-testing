import Express from 'express';
import OrderController from '../controller/order.controller';


let OderRouter = Express.Router();

OderRouter.post('/add', OrderController.add);

export default OderRouter;