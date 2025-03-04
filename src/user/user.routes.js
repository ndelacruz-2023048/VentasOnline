import { Router } from "express";
import { deleteProfileAsAdmin, deleteProfileAsClient, signUpAdmin, signUpClient, updateProfileAsAdmin, updateProfileAsClient } from "./user.controller.js";
import { registerAdmin, registerClient, validateDeleteUserAsAdmin, validateDeleteUserAsClient, validateUpdateProfileAsAdmin, validateUpdateProfileAsClient } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { validateAuthenticUser, validateAuthenticUserParam, validateCredentialsAsAdmin, validateObjectId } from "../../middelwares/validate.user.js";

let apiUser = Router()

apiUser.post('/admin',validateJwt,registerAdmin,signUpAdmin)
apiUser.post('/client',registerClient,signUpClient)
apiUser.put('/admin_update/:idUserToUpdate',validateJwt,validateObjectId,validateAuthenticUser,validateUpdateProfileAsAdmin,updateProfileAsAdmin)

apiUser.put('/client_update',validateJwt,validateUpdateProfileAsClient,updateProfileAsClient)

apiUser.delete('/deleteProfileAdmin/:userId',validateJwt,validateAuthenticUserParam,validateDeleteUserAsAdmin,validateCredentialsAsAdmin,deleteProfileAsAdmin)

apiUser.delete('/deleteProfileClient',validateJwt,validateDeleteUserAsClient,deleteProfileAsClient)

export default apiUser