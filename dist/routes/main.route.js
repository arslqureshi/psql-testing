"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const product_route_1 = __importDefault(require("./product.route"));
const order_route_1 = __importDefault(require("./order.route"));
const warehouse_route_1 = __importDefault(require("./warehouse.route"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    // emailController.sendmail("testing", "Testing email", "arslq7@gmail.com");
    res.send('hello from server');
});
router.use('/order', order_route_1.default);
router.use('/user', user_route_1.default);
router.use('/product', product_route_1.default);
router.use('./warehouse', warehouse_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map