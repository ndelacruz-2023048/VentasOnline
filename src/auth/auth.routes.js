import { Router } from "express";
import { login } from "./auth.controller.js";

let apiAuth = Router()

apiAuth.get('/login',login)

export default apiAuth