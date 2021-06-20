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
                const query2 = yield db_1.default.query(`select * from contract_request where requestFrom = $1 AND requestTo = $2`, [data.requestFrom, query1.rows[0].ownerid]);
                let finalQuery;
                if (query2.rows.length > 0) {
                    finalQuery = yield db_1.default.query(`update contract_request set date = $1 where id = $2`, [new Date(), query2.rows[0].id]);
                }
                else {
                    finalQuery = yield db_1.default.query(`insert into contract_request(requestFrom, requestTo, date) values($1, $2, $3) returning *`, [data.requestFrom, query1.rows[0].ownerid, new Date()]);
                }
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
                const query = yield db_1.default.query(`select contract_request.id as id, person.username, person.phoneNumber, person.email, person.id as sellerId from contract_request join person on person.id = contract_request.requestFrom where requestTo = $1`, [ownerId]);
                const query1 = yield db_1.default.query(`select warehouse_contract.id as id, warehouse_contract.status, warehouses.city, warehouses.address, person.username, warehouse_contract.expiryDate from warehouse_contract 
                join person on warehouse_contract.sellerId = person.id 
                join warehouses on warehouse_contract.warehouseId = warehouses.id
                where warehouseId IN(SELECT id FROM warehouses WHERE ownerid = $1)`, [ownerId]);
                let data = {
                    requests: query.rows,
                    contracts: query1.rows
                };
                res.send(data);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const query = yield db_1.default.query('insert into warehouse_contract(warehouseId, sellerId, penaltyAmount, expiryDate, status, description) values($1,$2,$3,$4,$5,$6)', [data.warehouseId, data.sellerId, data.penaltyAmount, new Date(data.expiryDate), data.status, data.description]);
                res.send({
                    data: 'contract sent'
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    deleteContractRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestId = req.params.requestId;
                const query1 = yield db_1.default.query('delete from contract_request where id = $1', [requestId]);
                console.log(query1);
                res.send({
                    data: 'request Deleted'
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    getSellerContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sellerId = req.params.sellerId;
                const query = yield db_1.default.query(`select warehouse_contract.id as id, warehouse_contract.expiryDate, warehouse_contract.penaltyAmount, warehouse_contract.status, warehouses.city, warehouses.address, warehouses.price, warehouse_contract.description
                 from warehouse_contract
                 join warehouses on warehouses.id = warehouse_contract.warehouseId
                 where sellerId = $1`, [sellerId]);
                res.send(query.rows);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractId = req.params.contractId;
                const query1 = yield db_1.default.query('delete from warehouse_contract where id = $1', [contractId]);
                console.log(query1);
                res.send({
                    data: 'Contract Deleted'
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    },
    contractStarted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                console.log(data);
                const query = yield db_1.default.query('update warehouse_contract set activeDate = $1, status = $2 where id = $3 returning *', [new Date(), 'active', data.warehouse_contractId]);
                const query1 = yield db_1.default.query('update warehouses set isRented = $1 where id = $2 returning *', [true, query.rows[0].warehouseid]);
                res.status(200).send({
                    data: "Warehouse Active"
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
};
exports.default = ContractController;
//# sourceMappingURL=contract.controller.js.map