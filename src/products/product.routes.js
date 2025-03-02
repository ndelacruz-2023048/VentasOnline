import { Router } from "express";
import {deleteProduct, getProducts, getProductsByCategory, getProductsById, getProductsByName, saveProducts,updateProducts} from '../products/product.controller.js' 
import { registerProduct, validateFilterProductName, validateFilterProductsByCategory } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateCredentialsAsAdmin } from "../../middelwares/validate.user.js";
import { get } from "mongoose";
const apiController = Router()

apiController.get('/product',validateJwt,getProducts)
apiController.get('/productById/:id_product',validateJwt,validateCredentialsAsAdmin,getProductsById)
apiController.post('/product_save',validateJwt,validateCredentialsAsAdmin,registerProduct,saveProducts)
apiController.put('/product_update/:id_product',validateJwt,validateCredentialsAsAdmin,updateProducts)
apiController.delete('/product_delete/:id_product',validateJwt,validateCredentialsAsAdmin,deleteProduct)

apiController.get('/product_filter_category/:id_category',validateJwt,validateFilterProductsByCategory,getProductsByCategory)
apiController.get('/product_filter_name',validateJwt,validateFilterProductName,getProductsByName)
export default apiController