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
const WarehouseController = {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                console.log(userData);
                const result = yield db_1.default.query('INSERT INTO warehouses (city, address, details, price, ownerId, lat, lng) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *', [userData.city, userData.address, userData.details, userData.price, userData.ownerId, userData.lat, userData.lng]);
                res.send(result.rows[0]);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getByOwnerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerId = req.params.ownerId;
                const result = yield db_1.default.query('SELECT * FROM warehouses WHERE ownerid = $1', [ownerId]);
                console.log(result.rows);
                res.send(result.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const data = yield db_1.default.query('SELECT * FROM warehouses where id=$1', [userData.id]);
                if (data.rows[0]) {
                    const query = yield db_1.default.query('UPDATE product SET city=$1, address=$2, details=$3, price=$4, ownerId=$5, lat=$6, lat=$7   WHERE id=$8', [userData.city, userData.address, userData.details, userData.price, userData.ownerId, userData.lat, userData.lat]);
                    res.send(query);
                }
                else {
                    res.status(404).send('Warehouse not found!');
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.productId;
                const data = yield db_1.default.query('SELECT stripeProductId FROM product WHERE id=$1', [id]);
                const query = yield db_1.default.query('DELETE FROM product WHERE id=$1', [id]);
                res.send(query);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
};
exports.default = WarehouseController;
//# sourceMappingURL=warehouse.controller.js.map