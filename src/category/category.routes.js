import { Router } from "express";
import { deleteCategory, getCategories, saveCategory, updateCategory } from "./category.controller.js";

const apiCategory = Router()

apiCategory.get('/category',getCategories)
apiCategory.post('/category',saveCategory)
apiCategory.put('/updateCategory/:id_category',updateCategory)
apiCategory.delete('/deleteCategory/:id_category',deleteCategory)
export default apiCategory