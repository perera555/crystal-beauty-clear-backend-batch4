import expres from 'express';

import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = expres.Router();

productRouter.post("/",createProduct) 
productRouter.get("/",getProducts)
productRouter.get("/:id",getProductById)// Assuming you want to get a specific product by ID
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)


export default productRouter;