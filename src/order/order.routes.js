import { Router } from "express";
import { createOrder } from "./order.controller.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";

const apiOrder = Router()

apiOrder.post('/order',validateJwt,createOrder)

export default apiOrder