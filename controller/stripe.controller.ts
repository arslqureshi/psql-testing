const stripe = require('stripe')('sk_test_51IoR81L6orHLq7kW3qZ0inGnHFU6nyDbK1ZTRnY3oyuTgz7ybRJVxTihnrg1tp0j5r9VoPBqbOjKGFMPXQnR3iGu00yCsD8jQn');

const StripeController = {
    async createCustomer(data) {
        const customer = await stripe.customers.create(data)  // accepts an object
        return customer;
    },
    async createPrice(data) {
        const price = await stripe.prices.create(data);         //accepts an object containing product id
        return price;
    },
    async createProduct(data) {
        const product = await stripe.products.create(data);     //accepts an object 
        return product;
    },
    async deleteProduct(data) {
        const deleted = await stripe.products.del(data);        //accepts stripe product id
        return deleted;
    },
    async updateProduct(id, data) {
        const product = await stripe.products.update(id, data); //accepts product id followed by object containing new data  
        return product;  
    },
    async updatePrice(id, data) {
        const price = await stripe.prices.update(id, data); //accepts price id followed by object containing new data    
        return price;
    },
    async createCard(id, data) {
        const card = await stripe.customers.createSource(id, {source: data}) //accepts customer id followed by object containing new data
        return card;
    }
}

export default StripeController