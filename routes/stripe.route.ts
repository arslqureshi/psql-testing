import Express from 'express';
import StripeController from '../controller/stripe.controller';

import authGuard from './authGuard.route';

let StripeRouter = Express.Router();

StripeRouter.get('/createCustomer', StripeController.createCustomer);


export default StripeRouter;