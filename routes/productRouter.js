import expres from 'express';

import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = expres.Router();

productRouter.post("/",createProduct) 
productRouter.get("/",getProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)

export default productRouter;