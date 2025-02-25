import { Router } from "express";
import { signUpAdmin, signUpClient, updateProfileAsAdmin } from "./user.controller.js";
import { registerAdmin, registerClient, validateUpdateProfileAsAdmin } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

let apiUser = Router()

apiUser.post('/admin',validateJwt,registerAdmin,signUpAdmin)
apiUser.post('/client',registerClient,signUpClient)
apiUser.put('/admin_update/:idUserToUpdate',validateJwt,validateUpdateProfileAsAdmin,updateProfileAsAdmin)

export default apiUser