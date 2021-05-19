import Express from 'express';
import OrderController from '../controller/order.controller';


let OderRouter = Express.Router();

OderRouter.get('/', OrderController.get);

export default OderRouter;