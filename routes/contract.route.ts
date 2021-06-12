import Express from 'express';
import ContractController from '../controller/contract.controller';


let ContractRouter = Express.Router();

ContractRouter.post('/addWarehouseRequest', ContractController.addWarehouseRequest);
ContractRouter.get('/getWarehouseRequestsAndContracts/:ownerId', ContractController.getWarehouseRequestsAndContracts);
ContractRouter.post('/createContract', ContractController.createContract);

export default ContractRouter;