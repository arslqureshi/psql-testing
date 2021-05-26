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
                const result = yield db_1.default.query('INSERT INTO warehouses (city, address, details, price, ownerId, lat, lng) VALUES($1, $2, $3, $4, $5, $6, $7, ) RETURNING *', [userData.city, userData.address, userData.details, userData.price, userData.ownerId, userData.lat, userData.lng]);
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
                const result = yield db_1.default.query('SELECT * FROM warehouses WHERE ownerId = $1', [ownerId]);
                console.log(result.rows);
                res.send(result.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
};
exports.default = WarehouseController;
//# sourceMappingURL=warehouse.controller.js.map