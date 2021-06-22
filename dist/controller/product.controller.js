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
const stripe_controller_1 = __importDefault(require("../controller/stripe.controller"));
const ProductController = {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                console.log(userData);
                const product = yield stripe_controller_1.default.createProduct({
                    name: userData.name,
                    description: userData.description
                });
                const price = yield stripe_controller_1.default.createPrice({
                    unit_amount: userData.price * 100,
                    currency: 'pkr',
                    product: product.id,
                });
                console.log(product.id, price.id);
                const result = yield db_1.default.query('INSERT INTO product (name, description, category, price, likes, sellerId, image, stripeProductId, stripePriceId, warehouseId) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [userData.name, userData.description, userData.category, userData.price, userData.like, userData.sellerId, userData.image, product.id, price.id, userData.warehouseId]);
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
                const data = yield db_1.default.query('SELECT stripeProductId FROM product WHERE id=$1', [id]);
                console.log(data.rows[0].stripeproductid);
                const deleted = yield stripe_controller_1.default.deleteProduct(data.rows[0].stripeproductid);
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
                const query = yield db_1.default.query(`SELECT product.price, name, product.id, description, category, likes, sellerId, image, warehouseId, username, warehouses.lat, warehouses.lng FROM product
                JOIN warehouses on warehouses.id = product.warehouseId
                JOIN person ON person.id = product.sellerId ORDER BY product.id DESC`);
                res.send(query.rows);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.productId;
                console.log(id);
                const query = yield db_1.default.query('SELECT * FROM product WHERE id = $1', [id]);
                res.send(query.rows[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    },
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const data = yield db_1.default.query('SELECT * FROM product where id=$1', [userData.id]);
                const product = yield stripe_controller_1.default.updateProduct(data.rows[0].stripeProductId, {
                    name: userData.name,
                    description: data.rows[0].description,
                });
                const price = yield stripe_controller_1.default.updatePrice(data.rows[0].stripePriceId, { unit_amount: data.rows[0].price * 100 });
                const query = yield db_1.default.query('UPDATE product SET name=$1, category=$2, description=$3, price=$4, stripeProductId=$5, stripePriceId=$6   WHERE id=$7', [userData.name, userData.category, userData.description, userData.price, product.id, price.id, userData.id]);
                res.send(query);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getFeedFromLocation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLocation = {
                    lat: req.params.lat,
                    lng: req.params.lng
                };
                const query = yield db_1.default.query(`SELECT product.price, name, product.id, description, category, likes, sellerId, image, warehouseId, username, warehouses.lat, warehouses.lng FROM product
                JOIN warehouses on warehouses.id = product.warehouseId
                JOIN person ON person.id = product.sellerId ORDER BY product.id DESC`);
                console.log(query.rows);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map