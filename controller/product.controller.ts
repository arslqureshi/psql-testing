import pool from '../src/db'; 

const ProductController =  {
    async add (req,res) {
        try{
            const userData = req.body;
            // console.log(userData);
            const result = await pool.query(
                'INSERT INTO product (name, description, category, price, likes, sellerId, image) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [userData.name, userData.description, userData.category, userData.price, userData.like, userData.sellerId, userData.image]
            )
            res.send(result.rows[0]);
        } catch(e) {
            console.log(e.message)
        }
    },
    async getBySellerId(req, res) {
        try{
            const sellerId = req.params.sellerId;
            const result = await pool.query(
                'SELECT * FROM product WHERE sellerId = $1',
                [sellerId]
            )
            console.log(result.rows)
            res.send(result.rows);
        } catch(e) {
            console.log(e.message)
        }
    },
    async deleteById(req, res) {
        try {
            const id = req.params.productId;
            const query = await pool.query(
                'DELETE FROM product WHERE id=$1',
                [id]
            )
            res.send(query);
        } catch(e) {
            console.log(e.message)
        }
    },
    async get(req,res) {

    }
}
export default ProductController;