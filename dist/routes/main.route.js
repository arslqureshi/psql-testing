"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const product_route_1 = __importDefault(require("./product.route"));
const router = express_1.default.Router();
const stripe_route_1 = __importDefault(require("./stripe.route"));
router.get('/', (req, res) => {
    // emailController.sendmail("testing", "Testing email", "arslq7@gmail.com");
    res.send('hello from server');
});
router.use('/user', user_route_1.default);
router.use('/product', product_route_1.default);
router.use('/stripe', stripe_route_1.default);
exports.default = router;
//# sourceMappingURL=main.route.js.map