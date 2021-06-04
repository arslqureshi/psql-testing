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
    async edit(req,res) {
        try {
            const userData = req.body;
            const data = await pool.query(
                'SELECT * FROM warehouses where id=$1',
                [userData.id]
            );
            if(data.rows[0]) {
                const query = await pool.query(
                    'UPDATE warehouses SET city=$1, address=$2, details=$3, price=$4, ownerId=$5, lat=$6, lat=$7   WHERE id=$8',
                    [userData.city, userData.address, userData.details, userData.price, userData.ownerId, userData.lat, userData.lat]
                )
                res.send(query);
            } else {
                res.status(404).send('Warehouse not found!');
            }
        } catch (error) {
            console.log(error)
        }
    },
    async deleteById(req, res) {
        try {
            const id = req.params.warehouseId;
            const query = await pool.query(
                'DELETE FROM warehouses WHERE id=$1',
                [id]
            )
            res.send(query);
        } catch(e) {
            console.log(e.message)
        }
    },
    async getAll(req, res) {
        try {
            const query = await pool.query(
                `SELECT * FROM warehouses`
            )
            res.send(query.rows);
        } catch (e) {
            console.log(e.message);
        }
    } 
}

export default WarehouseController