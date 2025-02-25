import { Router } from "express";
import { signUpAdmin, signUpClient, updateProfileAsAdmin, updateProfileAsClient } from "./user.controller.js";
import { registerAdmin, registerClient, validateUpdateProfileAsAdmin, validateUpdateProfileAsClient } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateAuthenticUser, validateObjectId } from "../../middelwares/validate.user.js";

let apiUser = Router()

apiUser.post('/admin',validateJwt,registerAdmin,signUpAdmin)
apiUser.post('/client',registerClient,signUpClient)
apiUser.put('/admin_update/:idUserToUpdate',validateJwt,validateObjectId,validateAuthenticUser,validateUpdateProfileAsAdmin,updateProfileAsAdmin)

apiUser.put('/client_update',validateJwt,validateUpdateProfileAsClient,updateProfileAsClient)

export default apiUser