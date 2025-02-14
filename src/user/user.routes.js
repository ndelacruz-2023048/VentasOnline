import { Router } from "express";
import { signUpAdmin, signUpClient } from "./user.controller.js";
import { registerUser } from "../../middelwares/validators.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

let apiUser = Router()

apiUser.post('/admin',validateJwt,registerUser,signUpAdmin)
apiUser.post('/admin',signUpClient)

export default apiUser