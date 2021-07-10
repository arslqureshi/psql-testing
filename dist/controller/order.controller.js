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
            try {
                const data = req.body;
                if (data.orderType == "country") {
                    const query = yield db_1.default.query('INSERT INTO orders (dateOfOrder, totalPrice, buyerId, address, city, orderType, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [new Date(), data.totalPrice, data.buyerId, data.address, data.city, data.orderType, "pending"]);
                    const order = query.rows[0];
                    data.items.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                        const itemQuery = yield db_1.default.query('INSERT INTO order_items (count, subTotal, orderId, productId) VALUES($1, $2, $3, $4)', [element.count, element.subTotal, order.id, element.productId]);
                    }));
                    res.send(order);
                }
                else {
                    // for driver based order
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const query = yield db_1.default.query(`select * from orders where buyerId = $1`, [userId]);
                // console.log(query.rows);
                let allOrders = [];
                for (let i = 0; i < query.rows.length; i++) {
                    let itemQuery = yield db_1.default.query(`select * from order_items
                     join product on product.id = order_items.productId
                     where order_items.orderId = $1
                    `, [query.rows[i].id]);
                    query.rows[i].items = itemQuery.rows;
                    allOrders.push(query.rows[i]);
                }
                res.status(200).send(allOrders);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    addTrackingNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
};
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map