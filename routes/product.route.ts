import Express from 'express';
import ProductController from '../controller/product.controller';

import authGuard from './authGuard.route';

let ProductRouter = Express.Router();

ProductRouter.post('/', ProductController.add);
ProductRouter.get('/:sellerId', ProductController.getBySellerId);

export default ProductRouter;