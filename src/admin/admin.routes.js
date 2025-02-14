import { Router } from "express";
import { saveAdmin } from "./admin.controller.js";
import { registerAdmin } from "../../middelwares/validators.js";

let apiAdmin = Router()

apiAdmin.post('/admin',registerAdmin,saveAdmin)

export default apiAdmin