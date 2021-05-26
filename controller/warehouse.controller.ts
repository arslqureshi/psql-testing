import pool from '../src/db';

const WarehouseController = {
    async add(req,res) {
        try{
            const userData = req.body;
            console.log(userData);

            const result = await pool.query(
                'INSERT INTO warehouses (city, address, details, price, ownerId, lat, lng) VALUES($1, $2, $3, $4, $5, $6, $7 ) RETURNING *',
                [userData.city, userData.address, userData.details, userData.price, userData.ownerId, userData.lat, userData.lng ]
            )
           
            res.send(result.rows[0]);
        } catch(e) {
            console.log(e.message)
        }
    },
    async getByOwnerId(req, res) {
        try{
            const ownerId = req.params.ownerId;
            const result = await pool.query(
                'SELECT * FROM warehouses WHERE ownerid = $1',
                [ownerId]
            )
            console.log(result.rows)
            res.send(result.rows);
        } catch(e) {
            console.log(e.message)
        }
    },
}

export default WarehouseController