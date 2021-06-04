import Express from 'express';
import WarehouseController from '../controller/warehouse.controller';

import authGuard from './authGuard.route';

let WarehouseRouter = Express.Router();

WarehouseRouter.post('/', WarehouseController.add);
WarehouseRouter.get('/:ownerId', WarehouseController.getByOwnerId);
WarehouseRouter.get('/', WarehouseController.getAll);

export default WarehouseRouter;