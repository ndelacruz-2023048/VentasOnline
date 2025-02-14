import { Router } from "express";
import { login } from "./auth.controller.js";
import { signIn } from "../../middelwares/validators.js";

let apiAuth = Router()

apiAuth.get('/login',signIn,login)

export default apiAuth