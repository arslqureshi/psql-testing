"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/db"));
const OrderController = {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const query = yield db_1.default.query('INSERT INTO orders (dateOfOrder, totalPrice, buyerId, driverId) VALUES($1, $2, $3, $4) RETURNING *', [new Date(), data.totalPrice, data.buyerId, data.driverId]);
            const order = query.rows[0];
            data.items.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                const itemQuery = yield db_1.default.query('INSERT INTO order_items (count, subTotal, orderId, productId) VALUES($1, $2, $3, $4)', [element.count, element.subTotal, order.id, element.productId]);
                const seller = yield db_1.default.query('SELECT * FROM person where id=(SELECT sellerId FROM product WHERE id=$1)', [element.productId]);
            }));
            res.send(order);
        });
    }
};
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map