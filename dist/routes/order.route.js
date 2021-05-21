"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controller/order.controller"));
let OderRouter = express_1.default.Router();
OderRouter.post('/add', order_controller_1.default.add);
exports.default = OderRouter;
//# sourceMappingURL=order.route.js.map