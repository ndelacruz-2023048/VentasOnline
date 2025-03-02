import { Router } from "express";
import { deleteCategory, getCategories, getCategoriesById, saveCategory, updateCategory } from "./category.controller.js";
import { registerCategory, registerProduct } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateCredentialsAsAdmin } from "../../middelwares/validate.user.js";

const apiCategory = Router()

apiCategory.get('/category',validateJwt,getCategories)
apiCategory.get('/categoryById/:id_category',validateJwt,validateCredentialsAsAdmin,getCategoriesById)
apiCategory.post('/category_save',validateJwt,validateCredentialsAsAdmin,registerCategory,saveCategory)
apiCategory.put('/category_update/:id_category',validateJwt,validateCredentialsAsAdmin,updateCategory)
apiCategory.delete('/category_delete/:id_category',validateJwt,validateCredentialsAsAdmin,deleteCategory)
export default apiCategory