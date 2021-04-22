"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controller/product.controller"));
let ProductRouter = express_1.default.Router();
ProductRouter.post('/', product_controller_1.default.add);
ProductRouter.get('/:sellerId', product_controller_1.default.getBySellerId);
exports.default = ProductRouter;
//# sourceMappingURL=product.route.js.map