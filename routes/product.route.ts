import Express from 'express';
import ProductController from '../controller/product.controller';

import authGuard from './authGuard.route';

let ProductRouter = Express.Router();

ProductRouter.post('/', ProductController.add);
ProductRouter.get('/', ProductController.get);
ProductRouter.get('/:sellerId', ProductController.getBySellerId);
ProductRouter.get('/singleProduct/:productId', ProductController.getProductById);
ProductRouter.put('/', ProductController.edit)
ProductRouter.delete('/:productId', ProductController.deleteById);

export default ProductRouter;