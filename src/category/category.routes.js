import { Router } from "express";
import { saveCategory } from "./category.controller.js";

const apiCategory = Router()

apiCategory.post('/category',saveCategory)

export default apiCategory