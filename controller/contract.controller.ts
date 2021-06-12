import pool from '../src/db';

const ContractController = {
    async addWarehouseRequest(req, res) {
        try {
            const data = req.body;
            const query1 = await pool.query(
                `select * from warehouses join person on person.id=warehouses.ownerid where warehouses.id=$1`,
                [data.warehouseId]
            );
            console.log(query1.rows[0]);
            const query2 = await pool.query(
                `insert into contract_request(requestFrom, requestTo, date) values($1, $2, $3) returning *`,
                [data.requestFrom, query1.rows[0].ownerid, new Date()]
            );
            console.log(query2.rows[0]);
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
            console.log(data);
            res.send(data)
        } catch (e) {
            console.log(e.message)
        }
    }
}

export default ContractController;