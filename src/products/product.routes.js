import { Router } from "express";
import {deleteProduct, getProducts, getProductsById, saveProducts,updateProducts} from '../products/product.controller.js' 
import { registerProduct } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
const apiController = Router()

apiController.get('/product',validateJwt,getProducts)
apiController.get('/productById/:id_product',validateJwt,getProductsById)
apiController.post('/product',validateJwt,registerProduct,saveProducts)
apiController.put('/productUpdate/:id_product',validateJwt,updateProducts)
apiController.delete('/productDelete/:id_product',validateJwt,deleteProduct)

export default apiController