import pool from '../src/db'; 
import StripeController from '../controller/stripe.controller';

const ProductController =  {
    async add (req,res) {
        try{
            const userData = req.body;
            console.log(userData);
            const product = await StripeController.createProduct({
                name: userData.name,
                description: userData.description
            });              

            const price = await StripeController.createPrice({
                unit_amount: userData.price * 100,
                currency: 'pkr',
                product: product.id,
            });

            console.log(product.id, price.id);

            const result = await pool.query(
                'INSERT INTO product (name, description, category, price, likes, sellerId, image, stripeProductId, stripePriceId, warehouseId) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [userData.name, userData.description, userData.category, userData.price, userData.like, userData.sellerId, userData.image, product.id, price.id, userData.warehouseId]
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
            const data = await pool.query(
                'SELECT stripeProductId FROM product WHERE id=$1',
                [id]
            );
            console.log(data.rows[0].stripeproductid);
            const deleted = await StripeController.deleteProduct(
                data.rows[0].stripeproductid
            );
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
        try {
            const query = await pool.query(
                'SELECT price, name, product.id, description, category, likes, sellerId, image, username FROM product INNER JOIN person ON person.id = product.sellerId ORDER BY product.id DESC'
            );
            res.send(query.rows)
        } catch(error) {
            console.log(error);
        }
    },
    async getProductById(req, res) {
        try {
            const id = req.params.productId;
            console.log(id);
            const query = await pool.query(
                'SELECT * FROM product WHERE id = $1',
                [id]
            )
            res.send(query.rows[0]);
        } catch(e) {
            console.log(e);
        }
    },
    async edit(req,res) {
        try {
            const userData = req.body;
            const data = await pool.query(
                'SELECT * FROM product where id=$1',
                [userData.id]
            );
            const product = await StripeController.updateProduct(
                data.rows[0].stripeProductId,
                {
                    name: userData.name,
                    description: data.rows[0].description,
                }
              );
            
              const price = await StripeController.updatePrice(data.rows[0].stripePriceId,{unit_amount: data.rows[0].price * 100});
            
            const query = await pool.query(
                'UPDATE product SET name=$1, category=$2, description=$3, price=$4, stripeProductId=$5, stripePriceId=$6   WHERE id=$7',
                [userData.name, userData.category, userData.description, userData.price, product.id, price.id, userData.id]
            )
            res.send(query);
        } catch (error) {
            console.log(error)
        }
    }
}
export default ProductController;