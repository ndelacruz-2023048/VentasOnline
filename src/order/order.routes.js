import { Router } from "express";
import { createOrder } from "./order.controller.js";
import { validateJwt } from "../../middelwares/validate.jwt.js";
import { registerInvoice, validateUpdateProduct } from "../../middelwares/validators.js";

const apiOrder = Router()

apiOrder.post('/order',validateJwt,registerInvoice,createOrder)

export default apiOrder