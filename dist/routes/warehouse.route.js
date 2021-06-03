"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouse_controller_1 = __importDefault(require("../controller/warehouse.controller"));
let WarehouseRouter = express_1.default.Router();
WarehouseRouter.post('/', warehouse_controller_1.default.add);
WarehouseRouter.get('/:ownerId', warehouse_controller_1.default.getByOwnerId);
exports.default = WarehouseRouter;
//# sourceMappingURL=warehouse.route.js.map