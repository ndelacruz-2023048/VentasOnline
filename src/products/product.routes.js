import { Router } from "express";
import {deleteProduct, getProducts, saveProducts,updateProducts} from '../products/product.controller.js' 
const apiController = Router()

apiController.get('/product',getProducts)
apiController.post('/product',saveProducts)
apiController.put('/productUpdate/:id_product',updateProducts)
apiController.delete('/productDelete/:id_product',deleteProduct)

export default apiController