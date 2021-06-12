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
                `select * from warehouse_contract where warehouseId IN(SELECT id FROM warehouses WHERE ownerid = $1)`,
                [ownerId]
            )
            let data = {
                requests: query.rows,
                contracts: query1.rows
            }
            // console.log(data);
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
            const query1 = await pool.query(
                'select ownerId from warehouses where id = $1',
                [data.warehouseId]
            )
            console.log(query1.rows[0].ownerid, data.sellerId)
            const query2 = await pool.query(
                'delete from contract_request where requestTo = $1 and requestFrom = $2',
                [query1.rows[0].ownerId, data.sellerId]
            )
            console.log(query2);
            res.send({
                data: 'contract sent'
            });
        } catch (e) {
            console.log(e.message);
        }

    }
}

export default ContractController;