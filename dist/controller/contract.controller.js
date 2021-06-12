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
const ContractController = {
    addWarehouseRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const query1 = yield db_1.default.query(`select * from warehouses join person on person.id=warehouses.ownerid where warehouses.id=$1`, [data.warehouseId]);
                console.log(query1.rows[0]);
                const query2 = yield db_1.default.query(`insert into contract_request(requestFrom, requestTo, date) values($1, $2, $3) returning *`, [data.requestFrom, query1.rows[0].ownerid, new Date()]);
                console.log(query2.rows[0]);
                res.send({
                    data: 'request sent'
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getWarehouseRequestsAndContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerId = req.params.ownerId;
                console.log(ownerId);
                const query = yield db_1.default.query(`select contract_request.id as id, person.username, person.phoneNumber, person.email from contract_request join person on person.id = contract_request.requestFrom where requestTo = $1`, [ownerId]);
                // const query1 = await pool.query(
                //     'SELECT id FROM warehouses WHERE ownerid = $1',
                //     [ownerId]
                // )
                const query1 = yield db_1.default.query(`select * from warehouse_contract where warehouseId IN(SELECT id FROM warehouses WHERE ownerid = $1)`, [ownerId]);
                let data = {
                    requests: query.rows,
                    contracts: query1.rows
                };
                console.log(data);
                res.send(data);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
};
exports.default = ContractController;
//# sourceMappingURL=contract.controller.js.map