import { Router } from "express";
import {saveProducts,updateProducts} from '../products/product.controller.js' 
const apiController = Router()

apiController.post('/product',saveProducts)
apiController.put('/productUpdate/:id_product',updateProducts)
apiController.put('/productDelete/:id_product',updateProducts)

export default apiController