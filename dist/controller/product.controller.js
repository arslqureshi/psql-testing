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
const ProductController = {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                // console.log(userData);
                const result = yield db_1.default.query('INSERT INTO product (name, description, category, price, likes, sellerId, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [userData.name, userData.description, userData.category, userData.price, userData.like, userData.sellerId, userData.image]);
                res.send(result.rows[0]);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getBySellerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = req.params.sellerId;
                const result = yield db_1.default.query('SELECT * FROM product WHERE sellerId = $1', [sellerId]);
                console.log(result.rows);
                res.send(result.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.productId;
                const query = yield db_1.default.query('DELETE FROM product WHERE id=$1', [id]);
                res.send(query);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield db_1.default.query('SELECT * FROM product INNER JOIN person ON person.id = product.sellerId');
                console.log(query);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map