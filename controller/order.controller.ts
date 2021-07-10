import pool from '../src/db';
import StripeController from '../controller/stripe.controller';

const OrderController = {
    async add(req, res) {
        try {
            const data = req.body;
            if(data.orderType == "country") {
                const query = await pool.query(
                    'INSERT INTO orders (dateOfOrder, totalPrice, buyerId, address, city, orderType, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                    [new Date(), data.totalPrice, data.buyerId, data.address, data.city, data.orderType, "pending"]
                )
        
                const order = query.rows[0];
                data.items.forEach(async element => {
                    const itemQuery = await pool.query(
                        'INSERT INTO order_items (count, subTotal, orderId, productId) VALUES($1, $2, $3, $4)',
                        [element.count, element.subTotal, order.id, element.productId]
                    )
                });
                res.send(order);
            } else {
                // for driver based order
            }
        } catch (error) {
            console.log(error)
        }
    },
    async getAllOrders(req, res) {
        try {
            const userId = req.params.userId;
            const query = await pool.query(
                `select * from orders where buyerId = $1`,
                [userId]
            )
            // console.log(query.rows);
            let allOrders = [];
            for(let i=0; i<query.rows.length ;i++) {
                let itemQuery = await pool.query(
                    `select * from order_items
                     join product on product.id = order_items.productId
                     where order_items.orderId = $1
                    `,
                    [query.rows[i].id]
                 )
                 query.rows[i].items = itemQuery.rows;
                 allOrders.push(query.rows[i]);
            }
            res.status(200).send(allOrders);
        } catch(error) {
            console.log(error);
        }
    },
    async updateOrderStatus(req, res) {

    },
    async addTrackingNumber(req, res) {

    },
}

export default OrderController;