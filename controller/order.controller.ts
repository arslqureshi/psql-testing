import pool from '../src/db';
import StripeController from '../controller/stripe.controller';

const OrderController = {
    async add(req, res) {
        const data = req.body;
        const query = await pool.query(
            'INSERT INTO orders (dateOfOrder, totalPrice, buyerId, driverId) VALUES($1, $2, $3, $4) RETURNING *',
            [new Date(), data.totalPrice, data.buyerId, data.driverId]
        )

        const order = query.rows[0];
        data.items.forEach(async element => {
            const itemQuery = await pool.query(
                'INSERT INTO order_items (count, subTotal, orderId, productId) VALUES($1, $2, $3, $4)',
                [element.count, element.subTotal, order.id, element.productId]
            )
            const seller = await pool.query(
                'SELECT * FROM person where id=(SELECT sellerId FROM product WHERE id=$1)',
                [element.productId]
            )
            const transfer = await StripeController.transfer(element.subTotal, order.id, seller.rows[0].stripeconnectedaccountid);
            console.log(transfer);
        });
    }
}

export default OrderController;