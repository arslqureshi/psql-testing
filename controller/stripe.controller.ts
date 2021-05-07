import pool from '../src/db';
const stripe = require('stripe')('sk_test_51IoR81L6orHLq7kW3qZ0inGnHFU6nyDbK1ZTRnY3oyuTgz7ybRJVxTihnrg1tp0j5r9VoPBqbOjKGFMPXQnR3iGu00yCsD8jQn');

const StripeController = {
    async createCustomer(req, res) {
        const customer = await stripe.customers.create({
            email: req.body.email
          })
          console.log(customer.id);
          res.send(customer.id);
    }
}

export default StripeController