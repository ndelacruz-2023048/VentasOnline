import { Router } from "express";
import { deleteCategory, getCategories, saveCategory, updateCategory } from "./category.controller.js";
import { registerCategory, registerProduct } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiCategory = Router()

apiCategory.get('/category',getCategories)
apiCategory.post('/category',validateJwt,registerCategory,saveCategory)
apiCategory.put('/updateCategory/:id_category',validateJwt,updateCategory)
apiCategory.delete('/deleteCategory/:id_category',validateJwt,deleteCategory)
export default apiCategory