import Express from 'express';
import ContractController from '../controller/contract.controller';


let ContractRouter = Express.Router();

ContractRouter.post('/addWarehouseRequest', ContractController.addWarehouseRequest);
ContractRouter.get('/getWarehouseRequestsAndContracts/:ownerId', ContractController.getWarehouseRequestsAndContracts);
ContractRouter.post('/createContract', ContractController.createContract);
ContractRouter.delete('/deleteRequest/:requestId', ContractController.deleteContractRequest);
ContractRouter.get('/sellerContracts/:sellerId', ContractController.getSellerContracts);
ContractRouter.delete('/deleteContract/:contractId', ContractController.deleteContract);
ContractRouter.put('/contractStarted', ContractController.contractStarted);

export default ContractRouter;