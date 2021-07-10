"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controller/order.controller"));
let OrderRouter = express_1.default.Router();
OrderRouter.post('/add', order_controller_1.default.add);
OrderRouter.get('/getAllOrders/:userId', order_controller_1.default.getAllOrders);
OrderRouter.put('/updateOrderStatus', order_controller_1.default.updateOrderStatus);
OrderRouter.put('/addTrackingNumber', order_controller_1.default.addTrackingNumber);
exports.default = OrderRouter;
//# sourceMappingURL=order.route.js.map