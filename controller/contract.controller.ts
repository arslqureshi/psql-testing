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
    }
}

export default ContractController;