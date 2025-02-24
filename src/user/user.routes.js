import { Router } from "express";
import { signUpAdmin, signUpClient } from "./user.controller.js";
import { registerAdmin, registerClient } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

let apiUser = Router()

apiUser.post('/admin',validateJwt,registerAdmin,signUpAdmin)
apiUser.post('/client',registerClient,signUpClient)

export default apiUser