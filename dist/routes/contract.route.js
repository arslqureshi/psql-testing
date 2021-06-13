"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contract_controller_1 = __importDefault(require("../controller/contract.controller"));
let ContractRouter = express_1.default.Router();
ContractRouter.post('/addWarehouseRequest', contract_controller_1.default.addWarehouseRequest);
ContractRouter.get('/getWarehouseRequestsAndContracts/:ownerId', contract_controller_1.default.getWarehouseRequestsAndContracts);
ContractRouter.post('/createContract', contract_controller_1.default.createContract);
exports.default = ContractRouter;
//# sourceMappingURL=contract.route.js.map