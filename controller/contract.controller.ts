import pool from '../src/db';

const ContractController = {
    async addWarehouseRequest(req, res) {
        try {
            const data = req.body;
            const query1 = await pool.query(
                `select * from warehouses join person on person.id=warehouses.ownerid where warehouses.id=$1`,
                [data.warehouseId]
            );
            const query2 = await pool.query(
                `select * from contract_request where requestFrom = $1 AND requestTo = $2`,
                [data.requestFrom, query1.rows[0].ownerid]
            );
            let finalQuery;
            if(query2.rows.length > 0) {
                finalQuery = await pool.query(
                    `update contract_request set date = $1 where id = $2`,
                    [new Date(), query2.rows[0].id]
                )
            } else {
                finalQuery = await pool.query(
                    `insert into contract_request(requestFrom, requestTo, date) values($1, $2, $3) returning *`,
                    [data.requestFrom, query1.rows[0].ownerid, new Date()]
                );
            }
            res.send({
                data: 'request sent'
            });
        } catch(e) {
            console.log(e.message);
        }
    },
    async getWarehouseRequestsAndContracts(req, res) {
        try {
            const ownerId = req.params.ownerId;
            console.log(ownerId);
            const query = await pool.query(
                `select contract_request.id as id, person.username, person.phoneNumber, person.email, person.id as sellerId from contract_request join person on person.id = contract_request.requestFrom where requestTo = $1`,
                [ownerId]
            );
            const query1 = await pool.query(
                `select warehouse_contract.id as id, warehouse_contract.status, warehouses.city, warehouses.address, person.username, warehouse_contract.expiryDate from warehouse_contract 
                join person on warehouse_contract.sellerId = person.id 
                join warehouses on warehouse_contract.warehouseId = warehouses.id
                where warehouseId IN(SELECT id FROM warehouses WHERE ownerid = $1)`,
                [ownerId]
            )
            let data = {
                requests: query.rows,
                contracts: query1.rows
            }
            res.send(data)
        } catch (e) {
            console.log(e.message)
        }
    },
    async createContract(req, res) {
        try {
            const data = req.body;
            const query = await pool.query(
                'insert into warehouse_contract(warehouseId, sellerId, penaltyAmount, expiryDate, status, description) values($1,$2,$3,$4,$5,$6)',
                [data.warehouseId, data.sellerId, data.penaltyAmount, new Date(data.expiryDate), data.status, data.description]
            );
            res.send({
                data: 'contract sent'
            });
        } catch (e) {
            console.log(e.message);
        }

    },
    async deleteContractRequest(req, res) {
        try{
            const requestId = req.params.requestId;
            const query1 = await pool.query(
                'delete from contract_request where id = $1',
                [requestId]
            )
            console.log(query1);
            res.send({
                data: 'request Deleted'
            })
        } catch(e) {
            console.log(e.message)
        }
    },
    async getSellerContracts(req, res) {
        try{
            const sellerId = req.params.sellerId;
            const query = await pool.query(
                `select warehouse_contract.id as id, warehouse_contract.expiryDate, warehouse_contract.penaltyAmount, warehouse_contract.status, warehouses.city, warehouses.address, warehouses.price, warehouse_contract.description, warehouses.id as warehouseId
                 from warehouse_contract
                 join warehouses on warehouses.id = warehouse_contract.warehouseId
                 where sellerId = $1`,
                [sellerId]
            )
            res.send(query.rows);
        } catch(e) {
            console.log(e.message);
        }
    },
    async deleteContract(req, res) {
        try {
            const contractId = req.params.contractId;
            const query1 = await pool.query(
                'delete from warehouse_contract where id = $1',
                [contractId]
            )
            console.log(query1);
            res.send({
                data: 'Contract Deleted'
            })
        } catch(e) {
            console.log(e.message);
        }
    },
    async contractStarted(req, res) {
        try{
            const data = req.body;
            console.log(data);
            const query = await pool.query(
                'update warehouse_contract set activeDate = $1, status = $2 where id = $3 returning *',
                [new Date(), 'active', data.warehouse_contractId]
            )
            const query1 = await pool.query(
                'update warehouses set isRented = $1 where id = $2 returning *',
                [true, query.rows[0].warehouseid]
            )
            res.status(200).send({
                data: "Warehouse Active"
            })
        } catch(e) {
            console.log(e.message);
        }
    }
}

export default ContractController;